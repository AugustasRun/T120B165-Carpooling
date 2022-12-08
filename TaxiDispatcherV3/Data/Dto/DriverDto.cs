namespace TaxiDispatcherV3.Data.Dto
{
    public record DriverDto(string firstName, string lastName, DateTime startedDriving, DateTime startedWorking, int WorkingForId);
}
