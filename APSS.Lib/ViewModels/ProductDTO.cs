using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APSS.Lib.ViewModels
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = default!;
        public decimal Price { get; set; }
       
        public string ShortDescription { get; set; } = default!;
  
        public int ProductCategoryId { get; set; }
        public string ProductCategoryName { get; set; }=default!;
        public string ProductPicture { get; set; } = default!;
    }
}
