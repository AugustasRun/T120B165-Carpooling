using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TaxiDispatcherV3.Auth.Models;

namespace TaxiDispatcherV3.Models
{
    public partial class Route : IUserOwnedResource
    {
        public int Id { get; set; }
        public string From { get; set; } = null!;
        public string To { get; set; } = null!;
        public DateTime Time { get; set; }
        public double Price { get; set; }
        public int DriverId { get; set; }
        [Required]
        public string UserId { get; set; }
        public ClinicUser User { get; set; }
    }
}
