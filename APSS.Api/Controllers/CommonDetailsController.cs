using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APSS.Lib.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace APSS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonDetailsController : ControllerBase
    {
        private readonly AutoPartsDbContext _context;

        public CommonDetailsController(AutoPartsDbContext context)
        {
            _context = context;
        }

        // GET: api/CommonDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommonDetail>>> GetCommonDetails()
        {
            return await _context.CommonDetails.ToListAsync();
        }

        // GET: api/CommonDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommonDetail>> GetCommonDetail(int id)
        {
            var commonDetail = await _context.CommonDetails.FindAsync(id);

            if (commonDetail == null)
            {
                return NotFound();
            }

            return commonDetail;
        }

        // PUT: api/CommonDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommonDetail(int id, CommonDetail commonDetail)
        {
            if (id != commonDetail.CommonDetailId)
            {
                return BadRequest();
            }

            _context.Entry(commonDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommonDetailExists(id))
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

        // POST: api/CommonDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CommonDetail>> PostCommonDetail(CommonDetail commonDetail)
        {
            _context.CommonDetails.Add(commonDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCommonDetail", new { id = commonDetail.CommonDetailId }, commonDetail);
        }

        // DELETE: api/CommonDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommonDetail(int id)
        {
            var commonDetail = await _context.CommonDetails.FindAsync(id);
            if (commonDetail == null)
            {
                return NotFound();
            }

            _context.CommonDetails.Remove(commonDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommonDetailExists(int id)
        {
            return _context.CommonDetails.Any(e => e.CommonDetailId == id);
        }
    }
}
