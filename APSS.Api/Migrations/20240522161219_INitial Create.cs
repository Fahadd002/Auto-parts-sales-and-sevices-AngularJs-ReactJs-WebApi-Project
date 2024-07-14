using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace APSS.Api.Migrations
{
    /// <inheritdoc />
    public partial class INitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CommonDetails",
                columns: table => new
                {
                    CommonDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DetailName = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommonDetails", x => x.CommonDetailId);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    CustomerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.CustomerId);
                });

            migrationBuilder.CreateTable(
                name: "ServiceStatus",
                columns: table => new
                {
                    ServiceStatusId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StatusName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceStatus", x => x.ServiceStatusId);
                });

            migrationBuilder.CreateTable(
                name: "Supplier",
                columns: table => new
                {
                    SupplierId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ContactName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ContactNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplier", x => x.SupplierId);
                });

            migrationBuilder.CreateTable(
                name: "VehicleTypes",
                columns: table => new
                {
                    VehicleTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VehicleTypeName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleTypes", x => x.VehicleTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Orders_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "CustomerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductCategories",
                columns: table => new
                {
                    ProductCategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductCategoryName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    VehicleTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategories", x => x.ProductCategoryId);
                    table.ForeignKey(
                        name: "FK_ProductCategories_VehicleTypes_VehicleTypeId",
                        column: x => x.VehicleTypeId,
                        principalTable: "VehicleTypes",
                        principalColumn: "VehicleTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceTypes",
                columns: table => new
                {
                    ServiceTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ServiceName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    VehicleTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceTypes", x => x.ServiceTypeId);
                    table.ForeignKey(
                        name: "FK_ServiceTypes_VehicleTypes_VehicleTypeId",
                        column: x => x.VehicleTypeId,
                        principalTable: "VehicleTypes",
                        principalColumn: "VehicleTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Price = table.Column<decimal>(type: "money", nullable: false),
                    ShortDescription = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ProductCategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_Products_ProductCategories_ProductCategoryId",
                        column: x => x.ProductCategoryId,
                        principalTable: "ProductCategories",
                        principalColumn: "ProductCategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceRequests",
                columns: table => new
                {
                    ServiceRequestId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ServiceTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceRequests", x => x.ServiceRequestId);
                    table.ForeignKey(
                        name: "FK_ServiceRequests_ServiceTypes_ServiceTypeId",
                        column: x => x.ServiceTypeId,
                        principalTable: "ServiceTypes",
                        principalColumn: "ServiceTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Inventory",
                columns: table => new
                {
                    InventoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InventoryCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "money", nullable: false),
                    RetailPrice = table.Column<decimal>(type: "money", nullable: false),
                    SupplierId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventory", x => x.InventoryId);
                    table.ForeignKey(
                        name: "FK_Inventory_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inventory_Supplier_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Supplier",
                        principalColumn: "SupplierId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetails",
                columns: table => new
                {
                    OrderDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetails", x => x.OrderDetailId);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductDetails",
                columns: table => new
                {
                    ProductDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Label = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Value = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductDetails", x => x.ProductDetailId);
                    table.ForeignKey(
                        name: "FK_ProductDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductPictures",
                columns: table => new
                {
                    ProductPictureId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Picture = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductPictures", x => x.ProductPictureId);
                    table.ForeignKey(
                        name: "FK_ProductPictures_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StockEntries",
                columns: table => new
                {
                    StockEntryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalIn = table.Column<int>(type: "int", nullable: false),
                    TotalSold = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockEntries", x => x.StockEntryId);
                    table.ForeignKey(
                        name: "FK_StockEntries_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceDetails",
                columns: table => new
                {
                    ServiceDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(1500)", maxLength: 1500, nullable: false),
                    RequestDate = table.Column<DateTime>(type: "date", nullable: false),
                    ProposedServiceDate = table.Column<DateTime>(type: "date", nullable: false),
                    ServiceRequestId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceDetails", x => x.ServiceDetailId);
                    table.ForeignKey(
                        name: "FK_ServiceDetails_ServiceRequests_ServiceRequestId",
                        column: x => x.ServiceRequestId,
                        principalTable: "ServiceRequests",
                        principalColumn: "ServiceRequestId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceDetailEntries",
                columns: table => new
                {
                    ServiceDetailEntryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ServiceCost = table.Column<decimal>(type: "money", nullable: false),
                    ServiceDetailId = table.Column<int>(type: "int", nullable: false),
                    ServiceStatusId = table.Column<int>(type: "int", nullable: false),
                    ServiceRequestId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceDetailEntries", x => x.ServiceDetailEntryId);
                    table.ForeignKey(
                        name: "FK_ServiceDetailEntries_ServiceDetails_ServiceDetailId",
                        column: x => x.ServiceDetailId,
                        principalTable: "ServiceDetails",
                        principalColumn: "ServiceDetailId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceDetailEntries_ServiceRequests_ServiceRequestId",
                        column: x => x.ServiceRequestId,
                        principalTable: "ServiceRequests",
                        principalColumn: "ServiceRequestId");
                    table.ForeignKey(
                        name: "FK_ServiceDetailEntries_ServiceStatus_ServiceStatusId",
                        column: x => x.ServiceStatusId,
                        principalTable: "ServiceStatus",
                        principalColumn: "ServiceStatusId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Parts",
                columns: table => new
                {
                    PartId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PartName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Price = table.Column<decimal>(type: "money", nullable: false),
                    ServiceDetailEntryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parts", x => x.PartId);
                    table.ForeignKey(
                        name: "FK_Parts_ServiceDetailEntries_ServiceDetailEntryId",
                        column: x => x.ServiceDetailEntryId,
                        principalTable: "ServiceDetailEntries",
                        principalColumn: "ServiceDetailEntryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServicePayments",
                columns: table => new
                {
                    ServicePaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<decimal>(type: "money", nullable: false),
                    PaymentThrough = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "date", nullable: false),
                    ServiceDetailEntryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServicePayments", x => x.ServicePaymentId);
                    table.ForeignKey(
                        name: "FK_ServicePayments_ServiceDetailEntries_ServiceDetailEntryId",
                        column: x => x.ServiceDetailEntryId,
                        principalTable: "ServiceDetailEntries",
                        principalColumn: "ServiceDetailEntryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "CustomerId", "CustomerName", "Email", "Phone" },
                values: new object[,]
                {
                    { 1, "md ashunm", "fgahsdi@gmail.com", "015xxxxxxxxx" },
                    { 2, "md gfsd", "dfdfsf@gmail.com", "018xxxxxxxxx" },
                    { 3, "md asfag", "rtertet@gmail.com", "017xxxxxxxxx" },
                    { 4, "md tander", "vfgdfhh@gmail.com", "014xxxxxxxxx" }
                });

            migrationBuilder.InsertData(
                table: "ServiceStatus",
                columns: new[] { "ServiceStatusId", "StatusName" },
                values: new object[,]
                {
                    { 1, "New" },
                    { 2, "Assigned" },
                    { 3, "In Progress" },
                    { 4, "Pending" },
                    { 5, "Resolved" }
                });

            migrationBuilder.InsertData(
                table: "Supplier",
                columns: new[] { "SupplierId", "CompanyName", "ContactName", "ContactNo" },
                values: new object[,]
                {
                    { 1, "M/s Hajee Automobiles", "Md. Rafique Hajee", "012xxxxxxxx" },
                    { 2, "M/s Babul Enterprise", "Md. Tauhid", "013xxxxxxxx" },
                    { 3, "M/s Talukder Automobiles", "Md. Tanveer", "019xxxxxxxx" },
                    { 4, "M/s Hossain Automobiles", "Md. Asad Ullaaah", "018xxxxxxxx" },
                    { 5, "M/s Aslam Enterprise", "Md. Shakil", "012xxxxxxxx" }
                });

            migrationBuilder.InsertData(
                table: "VehicleTypes",
                columns: new[] { "VehicleTypeId", "VehicleTypeName" },
                values: new object[,]
                {
                    { 1, "Car" },
                    { 2, "Bike" }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "OrderId", "CustomerId", "OrderDate" },
                values: new object[,]
                {
                    { 1, 2, new DateTime(2024, 5, 8, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, 3, new DateTime(2024, 3, 8, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, 2, new DateTime(2024, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "ProductCategories",
                columns: new[] { "ProductCategoryId", "ProductCategoryName", "VehicleTypeId" },
                values: new object[,]
                {
                    { 1, "Brakes", 1 },
                    { 2, "Engine Parts", 1 },
                    { 3, "Suspension and Streering", 1 },
                    { 4, "Helmet", 2 },
                    { 5, "Handlebars", 2 },
                    { 6, "Body Frame", 2 }
                });

            migrationBuilder.InsertData(
                table: "ServiceTypes",
                columns: new[] { "ServiceTypeId", "ServiceName", "VehicleTypeId" },
                values: new object[,]
                {
                    { 1, "Car Wash", 1 },
                    { 2, "Filter Change", 2 }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "Price", "ProductCategoryId", "ProductName", "ShortDescription" },
                values: new object[,]
                {
                    { 1, 1200.00m, 1, "Brake pad", "Smooth Brakes" },
                    { 2, 1800.00m, 4, "Sports Helmet", "High quality material" }
                });

            migrationBuilder.InsertData(
                table: "ServiceRequests",
                columns: new[] { "ServiceRequestId", "CustomerName", "Email", "Phone", "ServiceTypeId" },
                values: new object[,]
                {
                    { 1, "Murad", "fsrgs@gmail.com", "0175xxxxxxxx", 1 },
                    { 2, "Aslam", "hgfhisd@gmail.com", "0129xxxxxxxx", 2 }
                });

            migrationBuilder.InsertData(
                table: "Inventory",
                columns: new[] { "InventoryId", "InventoryCode", "ProductId", "Quantity", "RetailPrice", "SupplierId", "UnitPrice" },
                values: new object[,]
                {
                    { 1, "BOW101W", 1, 12, 1200.00m, 1, 1000.00m },
                    { 2, "HFG0113", 2, 17, 1800.00m, 2, 1600.00m }
                });

            migrationBuilder.InsertData(
                table: "OrderDetails",
                columns: new[] { "OrderDetailId", "OrderId", "ProductId", "Quantity" },
                values: new object[,]
                {
                    { 1, 1, 1, 5 },
                    { 2, 2, 2, 15 },
                    { 3, 3, 1, 3 }
                });

            migrationBuilder.InsertData(
                table: "ProductDetails",
                columns: new[] { "ProductDetailId", "Label", "ProductId", "Value" },
                values: new object[,]
                {
                    { 1, "Manufacturer", 1, "Japan" },
                    { 2, "Weight", 2, "500gm" }
                });

            migrationBuilder.InsertData(
                table: "ProductPictures",
                columns: new[] { "ProductPictureId", "Picture", "ProductId" },
                values: new object[,]
                {
                    { 1, "brakepad.jpeg", 1 },
                    { 2, "helmet.jpeg", 2 }
                });

            migrationBuilder.InsertData(
                table: "ServiceDetails",
                columns: new[] { "ServiceDetailId", "Description", "ProposedServiceDate", "RequestDate", "ServiceRequestId" },
                values: new object[,]
                {
                    { 1, "Car should be washed properly both inner side and outer side.", new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 2, "Fuel filter should be Japanese branded", new DateTime(2024, 2, 7, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 }
                });

            migrationBuilder.InsertData(
                table: "StockEntries",
                columns: new[] { "StockEntryId", "ProductId", "TotalIn", "TotalSold" },
                values: new object[,]
                {
                    { 1, 1, 9, 8 },
                    { 2, 2, 15, 15 }
                });

            migrationBuilder.InsertData(
                table: "ServiceDetailEntries",
                columns: new[] { "ServiceDetailEntryId", "ServiceCost", "ServiceDetailId", "ServiceRequestId", "ServiceStatusId" },
                values: new object[,]
                {
                    { 1, 1000.00m, 1, null, 1 },
                    { 2, 100.00m, 2, null, 1 }
                });

            migrationBuilder.InsertData(
                table: "Parts",
                columns: new[] { "PartId", "PartName", "Price", "ServiceDetailEntryId" },
                values: new object[,]
                {
                    { 1, "Washing Powder", 130.00m, 1 },
                    { 2, "Fuel Filter", 130.00m, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_ProductId",
                table: "Inventory",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_SupplierId",
                table: "Inventory",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_OrderId",
                table: "OrderDetails",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ProductId",
                table: "OrderDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerId",
                table: "Orders",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Parts_ServiceDetailEntryId",
                table: "Parts",
                column: "ServiceDetailEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategories_VehicleTypeId",
                table: "ProductCategories",
                column: "VehicleTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductDetails_ProductId",
                table: "ProductDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPictures_ProductId",
                table: "ProductPictures",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductCategoryId",
                table: "Products",
                column: "ProductCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceDetailEntries_ServiceDetailId",
                table: "ServiceDetailEntries",
                column: "ServiceDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceDetailEntries_ServiceRequestId",
                table: "ServiceDetailEntries",
                column: "ServiceRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceDetailEntries_ServiceStatusId",
                table: "ServiceDetailEntries",
                column: "ServiceStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceDetails_ServiceRequestId",
                table: "ServiceDetails",
                column: "ServiceRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_ServicePayments_ServiceDetailEntryId",
                table: "ServicePayments",
                column: "ServiceDetailEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRequests_ServiceTypeId",
                table: "ServiceRequests",
                column: "ServiceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceTypes_VehicleTypeId",
                table: "ServiceTypes",
                column: "VehicleTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_StockEntries_ProductId",
                table: "StockEntries",
                column: "ProductId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommonDetails");

            migrationBuilder.DropTable(
                name: "Inventory");

            migrationBuilder.DropTable(
                name: "OrderDetails");

            migrationBuilder.DropTable(
                name: "Parts");

            migrationBuilder.DropTable(
                name: "ProductDetails");

            migrationBuilder.DropTable(
                name: "ProductPictures");

            migrationBuilder.DropTable(
                name: "ServicePayments");

            migrationBuilder.DropTable(
                name: "StockEntries");

            migrationBuilder.DropTable(
                name: "Supplier");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "ServiceDetailEntries");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "ServiceDetails");

            migrationBuilder.DropTable(
                name: "ServiceStatus");

            migrationBuilder.DropTable(
                name: "ProductCategories");

            migrationBuilder.DropTable(
                name: "ServiceRequests");

            migrationBuilder.DropTable(
                name: "ServiceTypes");

            migrationBuilder.DropTable(
                name: "VehicleTypes");
        }
    }
}
