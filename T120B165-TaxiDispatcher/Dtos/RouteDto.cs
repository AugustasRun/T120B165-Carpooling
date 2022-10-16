namespace T120B165_TaxiDispatcher.Dtos
{
    public class RouteDto
    {
        public int Id { get; set; }
        public string? From { get; set; } = null!;
        public string? To { get; set; } = null!;
        public DateTime? Time { get; set; }
        public double? Price { get; set; }
        public int? DriverId { get; set; }
    }
}
