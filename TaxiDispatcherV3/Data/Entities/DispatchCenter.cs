using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TaxiDispatcherV3.Auth.Models;

namespace TaxiDispatcherV3.Models
{
    public partial class DispatchCenter : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string City { get; set; } = null!;
        [Required]
        public string UserId { get; set; }
        public ClinicUser User { get; set; }
    }
}
