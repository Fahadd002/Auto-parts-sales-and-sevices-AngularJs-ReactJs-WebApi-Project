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
    public class ProductsController : ControllerBase
    {
        private readonly AutoPartsDbContext _context;

        public ProductsController(AutoPartsDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products
                .Include(x=>x.ProductDetails)
                .Include(z=>z.ProductPictures)
                .ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }


        /////////////////
        ///// GET: api/Products/5
        [HttpGet("{id}/Include")]
        public async Task<ActionResult<Product>> GetProductWithDetails(int id)
        {
            var product = await _context.Products
                .Include(x=> x.ProductDetails)
                .Include (z=>z.ProductPictures)
                .FirstOrDefaultAsync(x=> x.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpGet("Details/Of/{id}")]
        public async Task<ActionResult<IEnumerable<ProductDetail>>> GetDetailsOfProduct(int id)
        {
            var data = await _context.ProductDetails.Where(x => x.ProductId == id).ToListAsync();
            return data;
        }


        [HttpGet("Details/Include")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductWithDetails()
        {
            return await _context.Products
                .Include(x => x.ProductDetails)
                .ToListAsync();
        }

        [HttpGet("Pictures/Of/{id}")]
        public async Task<ActionResult<IEnumerable<ProductPicture>>> GetPicturesOfProduct(int id)
        {
            var data = await _context.ProductPictures.Where(x => x.ProductId == id).ToListAsync();
            return data;
        }






        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }
            var p = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == id);
            if (p == null)
            {
                return NotFound();
            }
            p.ProductName = product.ProductName;
            p.Price = product.Price;
            p.ShortDescription = product.ShortDescription;
            p.ProductCategoryId = product.ProductCategoryId;
            int n = _context.Database.ExecuteSqlInterpolated($"DELETE FROM ProductDetails WHERE ProductId={p.ProductId}");
            //_context.Entry(product).State = EntityState.Modified;
            foreach (var d in product.ProductDetails)
            {
                _context.ProductDetails.Add(new ProductDetail { ProductId = p.ProductId, Label = d.Label, Value = d.Value });
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        //DTO
        [HttpGet("DTO/{id}")]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProductDtos(int id /*vehicle type id*/)
        {
            var products = await _context.Products
                .Include(x => x.ProductCategory)
                .Include(x => x.ProductPictures)
                .Where(x => x.ProductCategory == null ? false : x.ProductCategory.VehicleTypeId == id)
                .ToListAsync();
            var data = products.Select(x => new ProductDTO
            {
                ProductId = x.ProductId,
                ProductName = x.ProductName,
                Price = x.Price,
                ShortDescription = x.ShortDescription,
                ProductCategoryId = x.ProductCategoryId,
                ProductCategoryName = x.ProductCategory?.ProductCategoryName ?? string.Empty,
                ProductPicture = x.ProductPictures?.FirstOrDefault()?.Picture ?? string.Empty,
            }).ToList();
            return data;
        }
        [HttpGet("Pictures/{id}")]
        public async Task<ActionResult<IEnumerable<ProductPicture>>> GetPictures(int id)
        {
            var data = await _context.ProductPictures.Where(x => x.ProductId == id).ToListAsync();
            return data;
        }


        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
