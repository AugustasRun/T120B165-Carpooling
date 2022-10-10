using System;
using System.Collections.Generic;

namespace T120B165_TaxiDispatcher.Models
{
    public partial class Driver
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public DateTime StartedDriving { get; set; }
        public DateTime StartedWorking { get; set; }
        public int WorkingForId { get; set; }
    }
}
