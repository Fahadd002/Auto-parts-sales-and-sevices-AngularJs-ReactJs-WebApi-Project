using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APSS.Lib.Models;
using APSS.Lib.ViewModels;

namespace APSS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceRequestsController : ControllerBase
    {
        private readonly AutoPartsDbContext _context;

        public ServiceRequestsController(AutoPartsDbContext context)
        {
            _context = context;
        }

        // GET: api/ServiceRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceRequest>>> GetServiceRequests()
        {
            return await _context.ServiceRequests
                .Include(x=>x.ServiceDetails)
                .ToListAsync();
        }

        // GET: api/ServiceRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceRequest>> GetServiceRequest(int id)
        {
            var serviceRequest = await _context.ServiceRequests.FindAsync(id);

            if (serviceRequest == null)
            {
                return NotFound();
            }

            return serviceRequest;
        }

        ///// GET: api/Products/5
        [HttpGet("{id}/Include")]
        public async Task<ActionResult<ServiceRequest>> GetServiceRequestWithServiceDetails(int id)
        {
            var serviceRequest = await _context.ServiceRequests
                .Include(x => x.ServiceDetails)
                .FirstOrDefaultAsync(x => x.ServiceRequestId == id);

            if (serviceRequest == null)
            {
                return NotFound();
            }

            return serviceRequest;
        }
        [HttpGet("Details/Of/{id}")]
        public async Task<ActionResult<IEnumerable<ServiceDetail>>> GetDetailsOfServiceRequest(int id)
        {
            var data = await _context.ServiceDetails.Where(x => x.ServiceRequestId == id).ToListAsync();
            return data;
        }


        [HttpGet("Details/Include")]
        public async Task<ActionResult<IEnumerable<ServiceRequest>>> GetServiceRequestWithDetails()
        {
            return await _context.ServiceRequests
                .Include(x => x.ServiceDetails)
                .ToListAsync();
        }
        // PUT: api/ServiceRequests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceRequest(int id, ServiceRequest serviceRequest)
        {
            if (id != serviceRequest.ServiceRequestId)
            {
                return BadRequest();
            }

            var p = await _context.ServiceRequests.FirstOrDefaultAsync(x => x.ServiceRequestId == id);
            if (p == null)
            {
                return NotFound();
            }
            p.CustomerName = serviceRequest.CustomerName;
            p.Phone = serviceRequest.Phone;
            p.Email = serviceRequest.Email;
            p.ServiceTypeId = serviceRequest.ServiceTypeId;
            int n = _context.Database.ExecuteSqlInterpolated($"DELETE FROM ServiceDetails WHERE ServiceRequestId={p.ServiceRequestId}");
            //_context.Entry(product).State = EntityState.Modified;
            foreach (var d in serviceRequest.ServiceDetails)
            {
                _context.ServiceDetails.Add(new ServiceDetail { ServiceRequestId = p.ServiceRequestId, Description = d.Description, RequestDate = d.RequestDate, ProposedServiceDate = d.ProposedServiceDate });
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceRequestExists(id))
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
        [HttpGet("DTO")]
        public async Task<ActionResult<IEnumerable<ServiceRequestDTO>>> GetServiceRequestDtos()
        {
            var serviceRequests = await _context.ServiceRequests
                .Include(x => x.ServiceType)
                
                //.Where(x => x.ServiceType == null ? false : x.ServiceType.VehicleTypeId == id)
                .ToListAsync();
            var data = serviceRequests.Select(x => new ServiceRequestDTO
            {
                ServiceRequestId = x.ServiceRequestId,
                CustomerName = x.CustomerName,
                Phone = x.Phone,
                Email = x.Email,
                ServiceTypeId = x.ServiceTypeId,
                ServiceName = x.ServiceType?.ServiceName ?? string.Empty,
            }).ToList();
            return data;
        }

        // POST: api/ServiceRequests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ServiceRequest>> PostServiceRequest(ServiceRequest serviceRequest)
        {
            _context.ServiceRequests.Add(serviceRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceRequest", new { id = serviceRequest.ServiceRequestId }, serviceRequest);
        }

        // DELETE: api/ServiceRequests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceRequest(int id)
        {
            var serviceRequest = await _context.ServiceRequests.FindAsync(id);
            if (serviceRequest == null)
            {
                return NotFound();
            }

            _context.ServiceRequests.Remove(serviceRequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServiceRequestExists(int id)
        {
            return _context.ServiceRequests.Any(e => e.ServiceRequestId == id);
        }
    }
}
