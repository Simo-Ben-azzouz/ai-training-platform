using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Session.DeleteSession;

public class DeleteSessionHandler : IRequestHandler<DeleteSessionRequest, Result>
{
    private readonly IContext _context;

    public DeleteSessionHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteSessionRequest request, CancellationToken cancellationToken)
    {
        var session = await _context.Sessions.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (session is null) return Result.NotFound();

        _context.Sessions.Remove(session);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
