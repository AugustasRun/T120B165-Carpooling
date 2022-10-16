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
    public class DispatchCentersController : ControllerBase
    {
        private readonly TaxiDispatcherDbContext _context;
        private readonly IMapper _mapper;

        public DispatchCentersController(TaxiDispatcherDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/DispatchCenters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DispatchCenter>>> GetDispatchCenters()
        {
            return await _context.DispatchCenters.ToListAsync();
        }

        // GET: api/DispatchCenters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DispatchCenter>> GetDispatchCenter(int id)
        {
            var dispatchCenter = await _context.DispatchCenters.FindAsync(id);

            if (dispatchCenter == null)
            {
                return NotFound();
            }

            return dispatchCenter;
        }

        // PUT: api/DispatchCenters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDispatchCenter(int id, DispatchCenterDto dispatchCenter)
        {
            if (id != dispatchCenter.Id)
            {
                return BadRequest();
            }
            var dispatchCenterEntity = await _context.DispatchCenters.FindAsync(id);
            if (dispatchCenterEntity == null) 
            { 
                return NotFound(); 
            }
            dispatchCenterEntity = _mapper.Map(dispatchCenter, dispatchCenterEntity);
            _context.Entry(dispatchCenterEntity).State = EntityState.Modified;

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
        public async Task<ActionResult<DispatchCenter>> PostDispatchCenter(DispatchCenter dispatchCenter)
        {
            _context.DispatchCenters.Add(dispatchCenter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDispatchCenter", new { id = dispatchCenter.Id }, dispatchCenter);
        }

        // DELETE: api/DispatchCenters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDispatchCenter(int id)
        {
            var dispatchCenter = await _context.DispatchCenters.FindAsync(id);
            if (dispatchCenter == null)
            {
                return NotFound();
            }

            _context.DispatchCenters.Remove(dispatchCenter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DispatchCenterExists(int id)
        {
            return _context.DispatchCenters.Any(e => e.Id == id);
        }
    }
}
