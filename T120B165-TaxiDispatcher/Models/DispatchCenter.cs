using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace T120B165_TaxiDispatcher.Models
{
    public partial class DispatchCenter
    {
        public DispatchCenter()
        {
            Drivers = new HashSet<Driver>();
        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string City { get; set; } = null!;

        public virtual ICollection<Driver> Drivers { get; set; }
    }
}
