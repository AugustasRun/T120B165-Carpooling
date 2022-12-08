using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TaxiDispatcherV3.Auth.Models;

namespace TaxiDispatcherV3.Models
{
    public partial class Driver : IUserOwnedResource
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public DateTime StartedDriving { get; set; }
        public DateTime StartedWorking { get; set; }
        public int WorkingForId { get; set; }
        [Required]
        public string UserId { get; set; }
        public ClinicUser User { get; set; }

    }
}
