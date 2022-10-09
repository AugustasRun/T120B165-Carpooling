using System;
using System.Collections.Generic;

namespace T120B165_TaxiDispatcher.Models
{
    public partial class Driver
    {
        public Driver()
        {
            Routes = new HashSet<Route>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public DateTime StartedDriving { get; set; }
        public DateTime StartedWorking { get; set; }
        public int WorkingFor { get; set; }

        public virtual DispatchCenter WorkingForNavigation { get; set; } = null!;
        public virtual ICollection<Route> Routes { get; set; }
    }
}
