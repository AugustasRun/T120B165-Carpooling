using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using T120B165_TaxiDispatcher.Dtos;
using T120B165_TaxiDispatcher.Models;
using T120B165_TaxiDispatcher.Repository;

namespace T120B165_TaxiDispatcher.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriversController : ControllerBase
    {
        private readonly TaxiDispatcherDbContext _context;

        public DriversController(TaxiDispatcherDbContext context)
        {
            _context = context;
        }

        // GET: api/Drivers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Driver>>> GetDrivers()
        {
            return await _context.Drivers.ToListAsync();
        }

        // GET: api/Drivers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DriverRoutes>> GetDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);
            
            if (driver == null)
            {
                return NotFound();
            }
            var driverRoutes = new DriverRoutes();
            driverRoutes.FirstName = driver.FirstName;
            driverRoutes.LastName = driver.LastName;
            driverRoutes.StartedDriving = driver.StartedDriving;
            driverRoutes.StartedWorking = driver.StartedWorking;
            driverRoutes.Id = driver.Id;
            driverRoutes.WorkingForId = driver.WorkingForId;
            driverRoutes.Routes = _context.Routes.Where(r => r.DriverId==driverRoutes.Id).ToList();
            return driverRoutes;
        }

        // PUT: api/Drivers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDriver(int id, Driver driver)
        {
            if (id != driver.Id)
            {
                return BadRequest();
            }

            _context.Entry(driver).State = EntityState.Modified;

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
        public async Task<ActionResult<Driver>> PostDriver(Driver driver)
        {
            _context.Drivers.Add(driver);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDriver", new { id = driver.Id }, driver);
        }

        // DELETE: api/Drivers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }

            _context.Drivers.Remove(driver);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DriverExists(int id)
        {
            return _context.Drivers.Any(e => e.Id == id);
        }
    }
}
