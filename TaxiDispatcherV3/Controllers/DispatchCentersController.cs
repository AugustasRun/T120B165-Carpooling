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

namespace TaxiDispatcherV3.Controllers
{
    [Route("api/dispatchcenters")]
    [ApiController]
    public class DispatchCentersController : ControllerBase
    {
        private readonly TaxiDispatcherV3Context _context;
        private readonly IAuthorizationService _authorizationService;

        public DispatchCentersController(TaxiDispatcherV3Context context, IAuthorizationService authService)
        {
            _context = context;
            _authorizationService = authService;
        }

        // GET: api/DispatchCenters
        [HttpGet]
        [Authorize(Roles = ClinicRoles.User )]
        public async Task<ActionResult<IEnumerable<DispatchCenter>>> GetDispatchCenter()
        {
            return await _context.DispatchCenter.ToListAsync();
        }

        // GET: api/DispatchCenters/5
        [HttpGet("{id}")]
        [Authorize(Roles = ClinicRoles.User)]
        public async Task<ActionResult<DispatchCenter>> GetDispatchCenter(int id)
        {
            var dispatchCenter = await _context.DispatchCenter.FindAsync(id);

            if (dispatchCenter == null)
            {
                return NotFound();
            }

            return dispatchCenter;
        }

        // PUT: api/DispatchCenters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = ClinicRoles.User)]
        public async Task<IActionResult> PutDispatchCenter(int id, DispatchCenterDto dispatchCenter)
        {
            var temp = await _context.DispatchCenter.FindAsync(id);
            temp.City = dispatchCenter.city;
            temp.Name = dispatchCenter.name;
            _context.Entry(temp).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DispatchCenterExists(id))
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

        // POST: api/DispatchCenters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = ClinicRoles.Admin)]
        public async Task<ActionResult<DispatchCenter>> PostDispatchCenter(DispatchCenterDto dispatchCenter)
        {
            var dispatchCenterEntity = new DispatchCenter{ 
                City = dispatchCenter.city, 
                Name = dispatchCenter.name };
            dispatchCenterEntity.UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            _context.DispatchCenter.Add(dispatchCenterEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDispatchCenter", new { id = dispatchCenterEntity.Id }, dispatchCenterEntity);
        }

        // DELETE: api/DispatchCenters/5
        [HttpDelete("{id}")]
        [Authorize(Roles = ClinicRoles.Admin)]
        public async Task<IActionResult> DeleteDispatchCenter(int id)
        {
            var dispatchCenter = await _context.DispatchCenter.FindAsync(id);
            if (dispatchCenter == null)
            {
                return NotFound();
            }

            _context.DispatchCenter.Remove(dispatchCenter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DispatchCenterExists(int id)
        {
            return _context.DispatchCenter.Any(e => e.Id == id);
        }
    }
}
