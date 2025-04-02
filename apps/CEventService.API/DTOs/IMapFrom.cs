using AutoMapper;

namespace CEventService.API.DTOs;

public interface IMapFrom<T>
{
    void Mapping(Profile profile) => profile.CreateMap(typeof(T), GetType()).ReverseMap();
    
}
