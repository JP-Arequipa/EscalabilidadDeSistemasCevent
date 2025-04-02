using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class AttendanceService : BaseService<Attendance, int>, IAttendanceService
{
    private readonly IAttendanceRepository _repository;

    public AttendanceService(IAttendanceRepository repository) : base(repository)
    {
        _repository = repository;
    }
}
