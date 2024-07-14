using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APSS.Lib.ViewModels
{
    public class ImagePathResponse
    {
        public int ProductImageId { get; set; }

        public string ImagePath { get; set; } = default!;

        public int ProductId { get; set; }
    }

}
