using CEventService.API.Data;
using CEventService.API.Models;

namespace CEventService.API.DAO;

public class AttendanceRepository : BaseRepository<Attendance, int>, IAttendanceRepository
{
    public AttendanceRepository(AppDbContext dbContext) : base(dbContext)
    {
    }
}