namespace TaxiDispatcherV3.Data.Dto
{
    public record RouteDto(string From, string To, DateTime Time, double Price, int DriverId);
}
