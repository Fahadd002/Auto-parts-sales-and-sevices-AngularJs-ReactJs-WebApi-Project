using APSS.Lib.Models;
using APSS.Lib.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APSS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IWebHostEnvironment env;
        private readonly AutoPartsDbContext _context;
        public ImagesController(IWebHostEnvironment env, AutoPartsDbContext context)
        {
            this.env = env;
            _context = context;
        }
        [HttpPost("Upload/{id}")]
        public async Task<ActionResult<IEnumerable<ImagePathResponse>>> PostImage(int id, IFormFile[] files)
        {
            var product = await _context.Products.Include(x=>x.ProductPictures).FirstOrDefaultAsync(x=>x.ProductId==id);
            if (product == null)
            {
                return NotFound();
            }
            List<ImagePathResponse> images = new List<ImagePathResponse>();
            try
            {
                foreach (var file in files)
                {
                    string ext = Path.GetExtension(file.FileName);
                    string f = Guid.NewGuid() + ext;
                    if (!Directory.Exists(env.WebRootPath + "\\Iamges\\"))
                    {
                        Directory.CreateDirectory(env.WebRootPath + "\\Images\\");
                    }
                    using FileStream filestream = System.IO.File.Create(env.WebRootPath + "\\Images\\" + f);

                    file.CopyTo(filestream);
                    filestream.Flush();

                    filestream.Close();
                    var img = await this.DoAdd(f, product);
                    images.Add(new ImagePathResponse { ImagePath = f, ProductImageId = img.ProductPictureId, ProductId = product.ProductId });
                }
                return images;

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var img = await _context.ProductPictures.FirstOrDefaultAsync(x => x.ProductPictureId == id);
            if (img == null)
            {
                return NotFound();
            }

            _context.ProductPictures.Remove(img);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private async Task<ProductPicture> DoAdd(string f, Product p)
        {
            var data = new ProductPicture { Picture = f, ProductId = p.ProductId };
            _context.ProductPictures.Add(data);
            await _context.SaveChangesAsync();
            return data;
        }




    }
}
