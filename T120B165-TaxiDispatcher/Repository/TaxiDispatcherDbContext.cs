using Microsoft.EntityFrameworkCore;
using T120B165_TaxiDispatcher.Models;
using Route = T120B165_TaxiDispatcher.Models.Route;

namespace T120B165_TaxiDispatcher.Repository
{
    public class TaxiDispatcherDbContext : DbContext
    {
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<DispatchCenter> DispatchCenters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=(localdb)\\MSSQLLocalDB;Database=TaxiDispatcher;Trusted_Connection=True;");
        }
    }
}
