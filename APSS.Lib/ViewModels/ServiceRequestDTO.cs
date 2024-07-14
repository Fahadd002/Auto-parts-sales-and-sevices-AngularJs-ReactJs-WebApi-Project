using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APSS.Lib.ViewModels
{
    public class ServiceRequestDTO
    {
        public int ServiceRequestId { get; set; }
        public string CustomerName { get; set; } = default!;
        public string Phone { get; set; } = default!;
        public string Email { get; set; } = default!;
        public int ServiceTypeId { get; set; }
        public string ServiceName { get; set; } = default!;
    }
}
