using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Session.UpdateSession;

public class UpdateSessionHandler : IRequestHandler<UpdateSessionRequest, Result<SessionResponse>>
{
    private readonly IContext _context;

    public UpdateSessionHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result<SessionResponse>> Handle(UpdateSessionRequest request, CancellationToken cancellationToken)
    {
        var session = await _context.Sessions.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (session is null) return Result.NotFound();

        session.FormationId = request.FormationId;
        session.Title = request.Title;
        session.StartDate = request.StartDate;
        session.EndDate = request.EndDate;
        session.MeetingLink = request.MeetingLink;

        _context.Sessions.Update(session);
        await _context.SaveChangesAsync(cancellationToken);

        return Mapper.ToSessionDto(session);
    }
}
