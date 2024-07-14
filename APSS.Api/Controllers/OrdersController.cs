using APSS.Lib.Models;
using APSS.Lib.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APSS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AutoPartsDbContext _context;

        public OrdersController(AutoPartsDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders
                .Include(x => x.OrderDetails)
                .ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        ///// GET: api/Orders/5
        [HttpGet("{id}/Include")]
        public async Task<ActionResult<Order>> GetOrderWithOrderDetails(int id)
        {
            var order = await _context.Orders
                .Include(x => x.OrderDetails)
                .FirstOrDefaultAsync(x => x.OrderId == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
        [HttpGet("Details/Of/{id}")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetDetailsOfOrder(int id)
        {
            var data = await _context.OrderDetails
                .Include(x=>x.Product)
                .Where(x => x.OrderId == id).ToListAsync();
            return data;
        }


        [HttpGet("Details/Of/DTO/{id}")]
        public async Task<ActionResult<IEnumerable<OrderDetailDTO>>> GetDetailsOfOrderDTOs(int id)
        {

            var orderdetails = await _context.OrderDetails.Where(y=> y.OrderId == id)
                //.Where(x => x.ServiceType == null ? false : x.ServiceType.VehicleTypeId == id)
                .ToListAsync();
            var data = orderdetails.Select(x => new OrderDetailDTO
            {
                OrderDetailId = x.OrderDetailId,
                OrderId = x.OrderId,
                Quantity = x.Quantity,
                ProductId = x.ProductId,
                ProductName = getProduct(x.ProductId)
            }).ToList();
            return data;
        }



        [HttpGet("Details/Include")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrderWithDetails()
        {
            return await _context.Orders
                .Include(x => x.OrderDetails)
                .ToListAsync();
        }
        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            var p = await _context.Orders.FirstOrDefaultAsync(x => x.OrderId == id);
            if (p == null)
            {
                return NotFound();
            }
            p.OrderDate = order.OrderDate;
            p.CustomerId = order.CustomerId;
            int n = _context.Database.ExecuteSqlInterpolated($"DELETE FROM OrderDetails WHERE OrderId={p.OrderId}");
            //_context.Entry(product).State = EntityState.Modified;
            foreach (var d in order.OrderDetails)
            {
                _context.OrderDetails.Add(new OrderDetail { OrderId = p.OrderId, Quantity = d.Quantity, ProductId = d.ProductId });
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrderDtos()
        {
            var orders = await _context.Orders
                .Include(x => x.Customer)

                //.Where(x => x.ServiceType == null ? false : x.ServiceType.VehicleTypeId == id)
                .ToListAsync();
            var data = orders.Select(x => new OrderDTO
            {
                OrderId = x.OrderId,
                OrderDate = x.OrderDate,
                CustomerId = x.CustomerId,
                CustomerName = x.Customer?.CustomerName ?? string.Empty,
               
            }).ToList();
            return data;
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
       
        private string getProduct(int id)
        {
            var product = _context.Products.FirstOrDefault(x => x.ProductId == id);
            if(product == null) { return ""; }
            return product.ProductName;
        }

    }



}

