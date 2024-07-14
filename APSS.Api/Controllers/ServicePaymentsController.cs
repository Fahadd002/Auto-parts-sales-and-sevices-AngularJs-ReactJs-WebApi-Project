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
    public class ServicePaymentsController : ControllerBase
    {
        private readonly AutoPartsDbContext _context;

        public ServicePaymentsController(AutoPartsDbContext context)
        {
            _context = context;
        }

        // GET: api/ServicePayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServicePayment>>> GetServicePayments()
        {
            return await _context.ServicePayments.ToListAsync();
        }

        // GET: api/ServicePayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServicePayment>> GetServicePayment(int id)
        {
            var servicePayment = await _context.ServicePayments.FindAsync(id);

            if (servicePayment == null)
            {
                return NotFound();
            }

            return servicePayment;
        }

        // PUT: api/ServicePayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServicePayment(int id, ServicePayment servicePayment)
        {
            if (id != servicePayment.ServicePaymentId)
            {
                return BadRequest();
            }

            _context.Entry(servicePayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServicePaymentExists(id))
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

        // POST: api/ServicePayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ServicePayment>> PostServicePayment(ServicePayment servicePayment)
        {
            _context.ServicePayments.Add(servicePayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServicePayment", new { id = servicePayment.ServicePaymentId }, servicePayment);
        }

        // DELETE: api/ServicePayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServicePayment(int id)
        {
            var servicePayment = await _context.ServicePayments.FindAsync(id);
            if (servicePayment == null)
            {
                return NotFound();
            }

            _context.ServicePayments.Remove(servicePayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServicePaymentExists(int id)
        {
            return _context.ServicePayments.Any(e => e.ServicePaymentId == id);
        }
    }
}
