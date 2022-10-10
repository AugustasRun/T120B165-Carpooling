using System;
using System.Collections.Generic;

namespace T120B165_TaxiDispatcher.Models
{
    public partial class DispatchCenter
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string City { get; set; } = null!;
    }
}
