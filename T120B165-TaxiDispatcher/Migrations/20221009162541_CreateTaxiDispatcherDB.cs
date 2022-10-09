using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace T120B165_TaxiDispatcher.Migrations
{
    public partial class CreateTaxiDispatcherDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DispatchCenters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    City = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DispatchCenters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Drivers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    LastName = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    StartedDriving = table.Column<DateTime>(type: "datetime", nullable: false),
                    StartedWorking = table.Column<DateTime>(type: "datetime", nullable: false),
                    WorkingFor = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drivers", x => x.Id);
                    table.ForeignKey(
                        name: "Fk_WorkingFor",
                        column: x => x.WorkingFor,
                        principalTable: "DispatchCenters",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Routes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    From = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    To = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    Time = table.Column<DateTime>(type: "datetime", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    DriverId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Routes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_driverID",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_WorkingFor",
                table: "Drivers",
                column: "WorkingFor");

            migrationBuilder.CreateIndex(
                name: "IX_Routes_DriverId",
                table: "Routes",
                column: "DriverId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Routes");

            migrationBuilder.DropTable(
                name: "Drivers");

            migrationBuilder.DropTable(
                name: "DispatchCenters");
        }
    }
}
