namespace T120B165_TaxiDispatcher.Dtos
{
    public class DriverDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; } = null!;
        public string? LastName { get; set; } = null!;
        public DateTime? StartedDriving { get; set; } = null!;
        public DateTime? StartedWorking { get; set; } = null!;
        public int? WorkingForId { get; set; } = null!;
    }
}
