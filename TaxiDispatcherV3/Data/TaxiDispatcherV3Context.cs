using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaxiDispatcherV3.Auth.Models;
using TaxiDispatcherV3.Models;

namespace TaxiDispatcherV3.Data
{
    public class TaxiDispatcherV3Context : IdentityDbContext<ClinicUser>
    {
        public TaxiDispatcherV3Context (DbContextOptions<TaxiDispatcherV3Context> options)
            : base(options)
        {
        }

        public DbSet<TaxiDispatcherV3.Models.DispatchCenter> DispatchCenter { get; set; } = default!;

        public DbSet<TaxiDispatcherV3.Models.Driver> Driver { get; set; }

        public DbSet<TaxiDispatcherV3.Models.Route> Route { get; set; }
    }
}
