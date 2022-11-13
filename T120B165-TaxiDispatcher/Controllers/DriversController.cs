using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public DriversController(TaxiDispatcherDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Drivers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Driver>>> GetDrivers()
        {
            return await _context.Drivers.ToListAsync();
        }

        // GET: api/Drivers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Driver>> GetDriver(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);

            if (driver == null)
            {
                return NotFound();
            }

            return driver;
        }

        // PUT: api/Drivers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDriver(int id, DriverDto driver)
        {
            if (id != driver.Id)
            {
                return BadRequest();
            }
            var driverEntity = await _context.Drivers.FindAsync(id);
            if (driverEntity == null)
            {
                return NotFound();
            }
            var temp = new DriverDto();
            temp = _mapper.Map(driverEntity, temp);
            temp = _mapper.Map(driver, temp);
            driverEntity = _mapper.Map(temp, driverEntity);
            _context.Entry(driverEntity).State = EntityState.Modified;

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

        [HttpGet("{id}/routes")]
        public async Task<ActionResult<DriverRoutes>> GetDriversRoutes(int id)
        {
            var driver = await _context.Drivers.FindAsync(id);

            if (driver == null)
            {
                return Ok();
            }
            var driverRoutes = _mapper.Map<DriverRoutes>(driver);
            driverRoutes.Routes = _context.Routes.Where(r => r.DriverId == driverRoutes.Id).ToList();
            return driverRoutes;
        }

        private bool DriverExists(int id)
        {
            return _context.Drivers.Any(e => e.Id == id);
        }
    }
}
