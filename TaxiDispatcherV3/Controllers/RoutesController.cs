using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaxiDispatcherV3.Auth.Models;
using TaxiDispatcherV3.Data;
using TaxiDispatcherV3.Data.Dto;
using TaxiDispatcherV3.Models;
using Route = TaxiDispatcherV3.Models.Route;

namespace TaxiDispatcherV3.Controllers
{
    [Route("api/routes")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        private readonly TaxiDispatcherV3Context _context;
        private readonly IAuthorizationService _authorizationService;

        public RoutesController(TaxiDispatcherV3Context context, IAuthorizationService authService)
        {
            _context = context;
            _authorizationService = authService;
        }

        // GET: api/Routes
        [HttpGet]
        [Authorize(Roles = ClinicRoles.User)]
        public async Task<ActionResult<IEnumerable<Route>>> GetRoute()
        {
            return await _context.Route.ToListAsync();
        }

        // GET: api/Routes/5
        [HttpGet("{id}")]
        [Authorize(Roles = ClinicRoles.User)]
        public async Task<ActionResult<Route>> GetRoute(int id)
        {
            var route = await _context.Route.FindAsync(id);

            if (route == null)
            {
                return NotFound();
            }

            return route;
        }

        // PUT: api/Routes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = ClinicRoles.User)]
        public async Task<IActionResult> PutRoute(int id, RouteDto route)
        {
            var temp = await _context.Route.FindAsync(id);
            temp.From = route.From;
            temp.To = route.To;
            temp.Time = route.Time;
            temp.Price = route.Price;

            _context.Entry(temp).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RouteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Routes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = ClinicRoles.User)]
        public async Task<ActionResult<RouteDto>> PostRoute(RouteDto route)
        {
            var routeEntity = new Route
            {
                From = route.From,
                To = route.To,
                Time = route.Time,
                Price = route.Price,
                DriverId = route.DriverId
            };
            routeEntity.UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            _context.Route.Add(routeEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoute", new { id = routeEntity.Id }, route);
        }

        // DELETE: api/Routes/5
        [HttpDelete("{id}")]
        [Authorize(Roles = ClinicRoles.Admin)]
        public async Task<IActionResult> DeleteRoute(int id)
        {
            var route = await _context.Route.FindAsync(id);
            if (route == null)
            {
                return NotFound();
            }

            _context.Route.Remove(route);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RouteExists(int id)
        {
            return _context.Route.Any(e => e.Id == id);
        }
    }
}
