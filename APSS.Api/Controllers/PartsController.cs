using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APSS.Lib.Models;

namespace APSS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartsController : ControllerBase
    {
        private readonly AutoPartsDbContext _context;

        public PartsController(AutoPartsDbContext context)
        {
            _context = context;
        }

        // GET: api/Parts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Part>>> GetParts()
        {
            return await _context.Parts.ToListAsync();
        }

        // GET: api/Parts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Part>> GetPart(int id)
        {
            var part = await _context.Parts.FindAsync(id);

            if (part == null)
            {
                return NotFound();
            }

            return part;
        }

        // PUT: api/Parts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPart(int id, Part part)
        {
            if (id != part.PartId)
            {
                return BadRequest();
            }

            _context.Entry(part).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartExists(id))
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

        // POST: api/Parts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Part>> PostPart(Part part)
        {
            _context.Parts.Add(part);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPart", new { id = part.PartId }, part);
        }

        // DELETE: api/Parts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePart(int id)
        {
            var part = await _context.Parts.FindAsync(id);
            if (part == null)
            {
                return NotFound();
            }

            _context.Parts.Remove(part);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PartExists(int id)
        {
            return _context.Parts.Any(e => e.PartId == id);
        }
    }
}
