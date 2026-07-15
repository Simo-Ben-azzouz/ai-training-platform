using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Session.CreateSession;

public class CreateSessionHandler : IRequestHandler<CreateSessionRequest, Result<SessionResponse>>
{
    private readonly IContext _context;

    public CreateSessionHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result<SessionResponse>> Handle(CreateSessionRequest request, CancellationToken cancellationToken)
    {
        var created = Mapper.ToSessionEntity(request);
        _context.Sessions.Add(created);
        await _context.SaveChangesAsync(cancellationToken);
        return Mapper.ToSessionDto(created);
    }
}
