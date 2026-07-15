using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Session.GetSessionById;

public class GetSessionByIdHandler : IRequestHandler<GetSessionByIdRequest, Result<SessionResponse>>
{
    private readonly IContext _context;

    public GetSessionByIdHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result<SessionResponse>> Handle(GetSessionByIdRequest request, CancellationToken cancellationToken)
    {
        var session = await _context.Sessions.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (session is null) return Result.NotFound();

        return Mapper.ToSessionDto(session);
    }
}
