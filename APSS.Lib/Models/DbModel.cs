using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace APSS.Lib.Models
{
    public class VehicleType
    {
        public int VehicleTypeId { get; set; }
        [Required(ErrorMessage = "VehicleTypeName is required"), StringLength(50)]
        public string VehicleTypeName { get; set; } = default!;

        public virtual ICollection<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
        public virtual ICollection<ServiceType> ServiceTypes { get; set; } = new List<ServiceType>();


    }
    public class ProductCategory
    {
        public int ProductCategoryId { get; set; }
        [Required(ErrorMessage = "ProductCategoryName is required"), StringLength(50)]
        public string ProductCategoryName { get; set; } = default!;
        [Required, ForeignKey("VehicleType")]
        public int VehicleTypeId { get; set; }
        public virtual VehicleType? VehicleType { get; set; }
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    }
    public class Product
    {
        public int ProductId { get; set; }
        [Required(ErrorMessage = "ProductName is required"), StringLength(50), Display(Name = "Product Name")]
        public string ProductName { get; set; } = default!;
        [Required, Column(TypeName = "money"), DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "0.00")]
        public decimal Price { get; set; }
        [Required, StringLength(100)]
        public string ShortDescription { get; set; } = default!;
        [Required, ForeignKey("ProductCategory")]
        public int ProductCategoryId { get; set; }
        public virtual ProductCategory? ProductCategory { get; set; }
        public virtual IList<ProductPicture> ProductPictures { get; set; } = new List<ProductPicture>();
        public virtual ICollection<ProductDetail> ProductDetails { get; set; } = new List<ProductDetail>();
        public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();

        //
        public virtual StockEntry? StockEntry { get; set; }
    }
    public class ProductPicture
    {
        public int ProductPictureId { get; set; }
        [Required(ErrorMessage = "Picture is required"), StringLength(150)]
        public string Picture { get; set; } = default!;
        [Required, ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product? Product { get; set; }


    }
    public class ProductDetail
    {
        public int ProductDetailId { get; set; }
        [StringLength(50)]
        public string? Label { get; set; } = default!;
        [StringLength(50)]
        public string? Value { get; set; } = default!;
        [Required, ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product? Product { get; set; }

    }
    public class CommonDetail
    {
        public int CommonDetailId { get; set; }
        [Required(ErrorMessage = "DetailName is required"), StringLength(1000)]
        public string DetailName { get; set; } = default!;

    }
    public class ServiceType
    {
        public int ServiceTypeId { get; set; }
        [Required, StringLength(50)]
        public string ServiceName { get; set; } = default!;
        [Required, ForeignKey("VehicleType")]
        public int VehicleTypeId { get; set; }
        public virtual VehicleType? VehicleType { get; set; }
        public virtual ICollection<ServiceRequest> ServiceRequests { get; set; } = new List<ServiceRequest>();
    }
    
    public class ServiceRequest
    {
        public int ServiceRequestId { get; set; }
        [Required, StringLength(50)]
        public string CustomerName { get; set; } = default!;
        [Required, StringLength(50)]
        public string Phone { get; set; } = default!;
        [Required, StringLength(50)]
        public string Email { get; set; } = default!;
        [Required, ForeignKey("ServiceType")]
        public int ServiceTypeId { get; set; }
        public virtual ServiceType? ServiceType { get; set; }

        public virtual ICollection<ServiceDetailEntry> ServiceDetailEntries { get; set; } = new List<ServiceDetailEntry>();
        public virtual ICollection<ServiceDetail> ServiceDetails { get; set; } = new List<ServiceDetail>();


    }
    public class ServiceDetail
    {
        public int ServiceDetailId { get; set; }
        [Required, StringLength(1500)]
        public string Description { get; set; } = default!;
        [Required, Column(TypeName = "date"), DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "yyyy-MM-dd")]
        public DateTime RequestDate { get; set; }
        [Required, Column(TypeName = "date"), DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "yyyy-MM-dd")]
        public DateTime ProposedServiceDate { get; set; }
        [Required, ForeignKey("ServiceRequest")]
        public int ServiceRequestId { get; set; }
        public virtual ServiceRequest? ServiceRequest { get; set; }
        public virtual ICollection<ServiceDetailEntry> ServiceDetailEntries { get; set; }= new List<ServiceDetailEntry>();  

    }

    public class ServiceDetailEntry
    {
        public int ServiceDetailEntryId { get; set; }
        [Required, Column(TypeName = "money")]
        public decimal ServiceCost { get; set; }
        [Required, ForeignKey("ServiceDetail")]
        public int ServiceDetailId { get; set; }
        public virtual ServiceDetail? ServiceDetail { get; set; }
        [Required, ForeignKey("ServiceStatus")]
        public int ServiceStatusId { get; set; }
        public virtual ServiceStatus? ServiceStatus { get; set; }
        public virtual ICollection<Part> Parts { get; set; } = new List<Part>();
        public virtual ICollection<ServicePayment> ServicePayments { get; set; } = new List<ServicePayment>();
    }
    public class Part
    {
        public int PartId { get; set; }
        [Required, StringLength(50)]
        public string PartName { get; set; } = default!;
        [Required, Column(TypeName = "money")]
        public decimal Price { get; set; }
        [Required, ForeignKey("ServiceDetailEntry")]
        public int ServiceDetailEntryId { get; set; }
        public virtual ServiceDetailEntry? ServiceDetailEntry { get; set; }
    }
    public class ServiceStatus
    {
        public int ServiceStatusId { get; set; }
        [Required, StringLength(50)]
        public string StatusName { get; set; } = default!;
        public virtual ICollection<ServiceDetailEntry> ServiceDetailEntries { get; set; } = new List<ServiceDetailEntry>();
    }
    public class ServicePayment
    {
        public int ServicePaymentId { get; set; }
        [Required, Column(TypeName = "money")]
        public decimal Amount { get; set; }
        [Required, StringLength(50)]
        public string PaymentThrough { get; set; } = default!;
        [Required, Column(TypeName = "date"), DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "yyyy-MM-dd")]

        public DateTime PaymentDate { get; set; }
        [Required, ForeignKey("ServiceDetailEntry")]
        public int ServiceDetailEntryId { get; set; }
        public virtual ServiceDetailEntry? ServiceDetailEntry { get; set; }
    }
    public class Supplier
    {
        public int SupplierId { get; set; }
        [Required(ErrorMessage = "CompanyName is required"), StringLength(50), Display(Name = "Company Name")]
        public string CompanyName { get; set; } = default!;
        [Required(ErrorMessage = "ContactName is required"), StringLength(50), Display(Name = "Contact Name")]
        public string ContactName { get; set; } = default!;
        [Required, StringLength(30)]
        public string ContactNo { get; set; } = default!;
        public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();

    }
    public class Inventory
    {
        public int InventoryId { get; set; }
        [Required, StringLength(50)]
        public string InventoryCode { get; set; } = default!;
        [Required]
        public int Quantity { get; set; }
        [Required, Column(TypeName = "money"), DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "0.00")]
        public decimal UnitPrice { get; set; }
        [Required, Column(TypeName = "money"), DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "0.00")]
        public decimal RetailPrice { get; set; }
        [Required, ForeignKey("Supplier")]
        public int SupplierId { get; set; }
        public virtual Supplier? Supplier { get; set; }
        [Required, ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product? Product { get; set; }
        
    }

    public class StockEntry
    {
        public int StockEntryId { get; set; }
        [Required]
        public int TotalIn { get; set; }
        [Required]
        public int TotalSold { get; set; }
        [Required,ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product? Product { get; set; }
    }
    public class Customer
    {
        public int CustomerId { get; set; }
        [Required(ErrorMessage = "CustomerName is required"), StringLength(50), Display(Name = "Customer Name")]

        public string CustomerName { get; set; } = default!;
        [Required(ErrorMessage = "Phone is required"), StringLength(20)]
        public string Phone { get; set; } = default!;
        [Required(ErrorMessage = "Email is required"), StringLength(30)]
        public string Email { get; set; } = default!;
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    }
    public class Order
    {
        public int OrderId { get; set; }
        [Required, ForeignKey("Customer")]
        public int CustomerId { get; set; }
        [Required, Column(TypeName = "date"), DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "yyyy-MM-dd")]

        public DateTime OrderDate { get; set; }
        public virtual Customer? Customer { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
    public class OrderDetail
    {
        public int OrderDetailId { get; set; }
        [Required, ForeignKey("Order")]

        public int OrderId { get; set; }
        [Required, ForeignKey("Product")]

        public int ProductId { get; set; }
        [Required]
        public int Quantity { get; set; }
        public virtual Order? Order { get; set; }
        public virtual Product? Product { get; set; }
    }


    public class AutoPartsDbContext : DbContext
    {
        public AutoPartsDbContext(DbContextOptions<AutoPartsDbContext> options) : base(options) { }
        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductPicture> ProductPictures { get; set; }
        public DbSet<ProductDetail> ProductDetails { get; set; }
        public DbSet<CommonDetail> CommonDetails { get; set; }
        public DbSet<ServiceType> ServiceTypes { get; set; }
        public DbSet<ServiceRequest> ServiceRequests { get; set; }
        public DbSet<ServiceDetail> ServiceDetails { get; set; }
        public DbSet<ServiceDetailEntry> ServiceDetailEntries { get; set; }
        public DbSet<Part> Parts { get; set; }
        public DbSet<ServiceStatus> ServiceStatus { get; set; }
        public DbSet<ServicePayment> ServicePayments { get; set; }
        public DbSet<StockEntry> StockEntries { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(p => p.StockEntry)
                .WithOne(s => s.Product)
                .HasForeignKey<StockEntry>(s => s.ProductId);
            modelBuilder.Entity<VehicleType>().HasData(
           new VehicleType { VehicleTypeId = 1, VehicleTypeName = "Car" },
            new VehicleType { VehicleTypeId = 2, VehicleTypeName = "Bike" }
           );
            modelBuilder.Entity<ProductCategory>().HasData(
                new ProductCategory { ProductCategoryId = 1, ProductCategoryName = "Brakes", VehicleTypeId = 1 },
                new ProductCategory { ProductCategoryId = 2, ProductCategoryName = "Engine Parts", VehicleTypeId = 1 },
                new ProductCategory { ProductCategoryId = 3, ProductCategoryName = "Suspension and Streering", VehicleTypeId = 1 },
                new ProductCategory { ProductCategoryId = 4, ProductCategoryName = "Helmet", VehicleTypeId = 2 },
                new ProductCategory { ProductCategoryId = 5, ProductCategoryName = "Handlebars", VehicleTypeId = 2 },
                new ProductCategory { ProductCategoryId = 6, ProductCategoryName = "Body Frame", VehicleTypeId = 2 }

                );
            modelBuilder.Entity<Product>().HasData(
                new Product { ProductId = 1, ProductName = "Brake pad", Price=1200.00M, ProductCategoryId=1, ShortDescription="Smooth Brakes"  },
                new Product { ProductId = 2, ProductName = "Sports Helmet", Price = 1800.00M, ProductCategoryId = 4, ShortDescription = "High quality material" }
                );
            modelBuilder.Entity<ProductDetail>().HasData(
                 new ProductDetail { ProductDetailId=1, Label="Manufacturer", Value="Japan",ProductId=1},
                 new ProductDetail { ProductDetailId = 2, Label = "Weight", Value = "500gm", ProductId = 2 }
                );
            modelBuilder.Entity<ProductPicture>().HasData(
                new ProductPicture { ProductId = 1, ProductPictureId = 1, Picture = "brakepad.jpeg" },
                new ProductPicture { ProductId = 2, ProductPictureId = 2, Picture = "helmet.jpeg" }
                );

            modelBuilder.Entity<ServiceType>().HasData(
                new ServiceType { ServiceTypeId = 1, ServiceName = "Car Wash", VehicleTypeId = 1 },
                new ServiceType { ServiceTypeId = 2, ServiceName = "Filter Change", VehicleTypeId = 2 }

                );

            modelBuilder.Entity<ServiceRequest>().HasData(
                new ServiceRequest { ServiceRequestId =1, CustomerName ="Murad", Phone ="0175xxxxxxxx",Email="fsrgs@gmail.com",ServiceTypeId=1},
                new ServiceRequest { ServiceRequestId = 2, CustomerName = "Aslam", Phone = "0129xxxxxxxx",Email="hgfhisd@gmail.com", ServiceTypeId = 2 }

                );
            modelBuilder.Entity<ServiceDetail>().HasData(
                new ServiceDetail { ServiceDetailId=1, Description="Car should be washed properly both inner side and outer side.", RequestDate=new DateTime(2024,02,01), ProposedServiceDate=new DateTime(2024,02,08),ServiceRequestId=1 },
                new ServiceDetail { ServiceDetailId = 2, Description = "Fuel filter should be Japanese branded", RequestDate = new DateTime(2024, 03, 05), ProposedServiceDate = new DateTime(2024, 02, 07),ServiceRequestId=2 }

                );
            modelBuilder.Entity<ServiceStatus>().HasData(
                new ServiceStatus { ServiceStatusId=1,StatusName= "New" },
                new ServiceStatus { ServiceStatusId = 2, StatusName = "Assigned" },
                new ServiceStatus { ServiceStatusId = 3, StatusName = "In Progress" },
                new ServiceStatus { ServiceStatusId = 4, StatusName = "Pending" },
                new ServiceStatus { ServiceStatusId = 5, StatusName = "Resolved" }
                 );

            modelBuilder.Entity<ServiceDetailEntry>().HasData(
                new ServiceDetailEntry { ServiceDetailEntryId =1, ServiceCost =1000.00M, ServiceDetailId =1, ServiceStatusId =1},
                new ServiceDetailEntry { ServiceDetailEntryId = 2, ServiceCost = 100.00M, ServiceDetailId = 2, ServiceStatusId = 1 }

                );

            modelBuilder.Entity<Part>().HasData(
                new Part { PartId =1, PartName ="Washing Powder", Price =130.00M,ServiceDetailEntryId=1},
                new Part { PartId = 2, PartName = "Fuel Filter", Price = 130.00M,ServiceDetailEntryId=2}


                );
            modelBuilder.Entity<Supplier>().HasData(
                new Supplier { SupplierId=1, CompanyName="M/s Hajee Automobiles", ContactNo="012xxxxxxxx",ContactName="Md. Rafique Hajee" },
                new Supplier { SupplierId = 2, CompanyName = "M/s Babul Enterprise", ContactNo = "013xxxxxxxx", ContactName = "Md. Tauhid" },
                new Supplier { SupplierId = 3, CompanyName = "M/s Talukder Automobiles", ContactNo = "019xxxxxxxx", ContactName = "Md. Tanveer" },
                new Supplier { SupplierId = 4, CompanyName = "M/s Hossain Automobiles", ContactNo = "018xxxxxxxx", ContactName = "Md. Asad Ullaaah" },
                new Supplier { SupplierId = 5, CompanyName = "M/s Aslam Enterprise", ContactNo = "012xxxxxxxx", ContactName = "Md. Shakil" }

                 );

            modelBuilder.Entity<Inventory>().HasData(
                new Inventory { InventoryId=1, InventoryCode= "BOW101W", Quantity=12, RetailPrice=1200.00M,UnitPrice=1000.00M, SupplierId=1, ProductId=1 },
                new Inventory { InventoryId = 2, InventoryCode = "HFG0113", Quantity = 17, RetailPrice = 1800.00M,UnitPrice=1600.00M ,SupplierId = 2, ProductId = 2 }
                );
            modelBuilder.Entity<StockEntry>().HasData(
                new StockEntry { StockEntryId = 1, TotalIn = 9, TotalSold = 8, ProductId = 1 },
                new StockEntry { StockEntryId = 2, TotalIn = 15, TotalSold = 15, ProductId = 2 }


                );
            modelBuilder.Entity<Customer>().HasData(
                new Customer { CustomerId=1,CustomerName="md ashunm", Phone ="015xxxxxxxxx", Email ="fgahsdi@gmail.com"},
                new Customer { CustomerId = 2, CustomerName = "md gfsd", Phone = "018xxxxxxxxx", Email = "dfdfsf@gmail.com" },
                new Customer { CustomerId = 3, CustomerName = "md asfag", Phone = "017xxxxxxxxx", Email = "rtertet@gmail.com" },
                new Customer { CustomerId = 4, CustomerName = "md tander", Phone = "014xxxxxxxxx", Email = "vfgdfhh@gmail.com" }
                );

            modelBuilder.Entity<Order>().HasData(
                new Order { OrderId = 1, OrderDate = new DateTime(2024, 05, 08), CustomerId = 2 },
                new Order { OrderId = 2, OrderDate = new DateTime(2024, 03, 08), CustomerId = 3 },
                new Order { OrderId = 3, OrderDate = new DateTime(2024, 04, 10), CustomerId = 2 }

                );
            modelBuilder.Entity<OrderDetail>().HasData(
                new OrderDetail { OrderDetailId = 1, OrderId = 1, Quantity = 5, ProductId = 1 },
                new OrderDetail { OrderDetailId = 2, OrderId = 2, Quantity = 15, ProductId = 2 },
                new OrderDetail { OrderDetailId = 3, OrderId = 3, Quantity = 3, ProductId = 1 }
                            );

        }
    }
}
