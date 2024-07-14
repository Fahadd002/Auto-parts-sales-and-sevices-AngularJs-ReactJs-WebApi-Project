using APSS.Lib.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APSS.Lib.ViewModels
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }

        public DateTime OrderDate { get; set; }
        public string CustomerName { get; set; } = default!;

    }
}
