using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace T120B165_TaxiDispatcher.Models
{
    public partial class Route
    {
        [Key]
        public int Id { get; set; }
        public string From { get; set; } = null!;
        public string To { get; set; } = null!;
        public DateTime Time { get; set; }
        public double Price { get; set; }
        public int DriverId { get; set; }

        public virtual Driver Driver { get; set; } = null!;
    }
}
