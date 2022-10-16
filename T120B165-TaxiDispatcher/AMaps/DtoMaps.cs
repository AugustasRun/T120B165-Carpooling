using AutoMapper;
using T120B165_TaxiDispatcher.Dtos;
using T120B165_TaxiDispatcher.Models;
using Route = T120B165_TaxiDispatcher.Models.Route;

namespace T120B165_TaxiDispatcher.AMaps
{
    public class DtoMaps : Profile
    {
        public DtoMaps()
        {
            CreateMap<Driver, DriverRoutes>();
            CreateMap<DispatchCenter, DispatchCenterDto>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<DispatchCenterDto, DispatchCenter>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Driver, DriverDto>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<DriverDto, Driver>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<DriverDto, DriverDto>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Route, RouteDto>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<RouteDto, Route>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<RouteDto, RouteDto>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        }
    }
}
