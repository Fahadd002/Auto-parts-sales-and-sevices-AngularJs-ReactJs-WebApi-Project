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
    public class ServiceStatusController : ControllerBase
    {
        private readonly AutoPartsDbContext _context;

        public ServiceStatusController(AutoPartsDbContext context)
        {
            _context = context;
        }

        // GET: api/ServiceStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceStatus>>> GetServiceStatus()
        {
            return await _context.ServiceStatus.ToListAsync();
        }

        // GET: api/ServiceStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceStatus>> GetServiceStatus(int id)
        {
            var serviceStatus = await _context.ServiceStatus.FindAsync(id);

            if (serviceStatus == null)
            {
                return NotFound();
            }

            return serviceStatus;
        }

        // PUT: api/ServiceStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceStatus(int id, ServiceStatus serviceStatus)
        {
            if (id != serviceStatus.ServiceStatusId)
            {
                return BadRequest();
            }

            _context.Entry(serviceStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceStatusExists(id))
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

        // POST: api/ServiceStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ServiceStatus>> PostServiceStatus(ServiceStatus serviceStatus)
        {
            _context.ServiceStatus.Add(serviceStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceStatus", new { id = serviceStatus.ServiceStatusId }, serviceStatus);
        }

        // DELETE: api/ServiceStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceStatus(int id)
        {
            var serviceStatus = await _context.ServiceStatus.FindAsync(id);
            if (serviceStatus == null)
            {
                return NotFound();
            }

            _context.ServiceStatus.Remove(serviceStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServiceStatusExists(int id)
        {
            return _context.ServiceStatus.Any(e => e.ServiceStatusId == id);
        }
    }
}
