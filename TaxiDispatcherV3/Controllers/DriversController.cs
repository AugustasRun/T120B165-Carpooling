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
    [Route("api/drivers")]
    [ApiController]
    public class DriversController : ControllerBase
    {
        private readonly TaxiDispatcherV3Context _context;
        private readonly IAuthorizationService _authorizationService;

        public DriversController(TaxiDispatcherV3Context context, IAuthorizationService authService)
        {
            _context = context;
            _authorizationService = authService;
        }

        // GET: api/Drivers
        [HttpGet]
        [Authorize(Roles = ClinicRoles.User)]
        public async Task<ActionResult<IEnumerable<Driver>>> GetDriver()
        {
            return await _context.Driver.ToListAsync();
        }

        // GET: api/Drivers/5
        [HttpGet("{id}")]
        [Authorize(Roles = ClinicRoles.User)]
        public async Task<ActionResult<Driver>> GetDriver(int id)
        {
            var driver = await _context.Driver.FindAsync(id);

            if (driver == null)
            {
                return NotFound();
            }

            return driver;
        }

        // PUT: api/Drivers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = ClinicRoles.User)]
        public async Task<IActionResult> PutDriver(int id, DriverDto driver)
        {
            var temp = await _context.Driver.FindAsync(id);
            temp.FirstName = driver.firstName;
            temp.LastName = driver.lastName;
            temp.StartedDriving = driver.startedDriving;
            temp.StartedWorking = driver.startedWorking;
            _context.Entry(temp).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverExists(id))
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

        // POST: api/Drivers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = ClinicRoles.User)]
        public async Task<ActionResult<DriverDto>> PostDriver(DriverDto driver)
        {
            var DriverEntity = new Driver
            {
                FirstName = driver.firstName,
                LastName = driver.lastName,
                StartedDriving = driver.startedDriving,
                StartedWorking = driver.startedWorking,
                WorkingForId = driver.WorkingForId
            };
            DriverEntity.UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            _context.Driver.Add(DriverEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDriver", new { id = DriverEntity.Id }, driver);
        }


        // DELETE: api/Drivers/5
        [HttpDelete("{id}")]
        [Authorize(Roles = ClinicRoles.Admin)]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            var driver = await _context.Driver.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }

            _context.Driver.Remove(driver);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DriverExists(int id)
        {
            return _context.Driver.Any(e => e.Id == id);
        }
    }
}
