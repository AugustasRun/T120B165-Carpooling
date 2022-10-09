using System;
using System.Collections.Generic;

namespace T120B165_TaxiDispatcher.Models
{
    public partial class DispatchCenter
    {
        public DispatchCenter()
        {
            Drivers = new HashSet<Driver>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string City { get; set; } = null!;

        public virtual ICollection<Driver> Drivers { get; set; }
    }
}
