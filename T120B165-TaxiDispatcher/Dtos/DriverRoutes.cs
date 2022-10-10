using T120B165_TaxiDispatcher.Models;
using Route = T120B165_TaxiDispatcher.Models.Route;

namespace T120B165_TaxiDispatcher.Dtos
{
    public class DriverRoutes
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public DateTime StartedDriving { get; set; }
        public DateTime StartedWorking { get; set; }
        public int WorkingForId { get; set; }
        public List<Route> Routes { get; set; }
    }
}
