using Ardalis.Result;
using Boilerplate.Application.Common;
using Boilerplate.Domain.Auth.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Anam.AskAnam;

public class AskAnamHandler : IRequestHandler<AskAnamRequest, Result<AskAnamResponse>>
{
    private readonly IContext _context;
    private readonly IAITrainerService _aiTrainerService;
    private readonly ISession _currentSession;

    public AskAnamHandler(IContext context, IAITrainerService aiTrainerService, ISession currentSession)
    {
        _context = context;
        _aiTrainerService = aiTrainerService;
        _currentSession = currentSession;
    }

    public async Task<Result<AskAnamResponse>> Handle(AskAnamRequest request, CancellationToken cancellationToken)
    {
        var session = await _context.Sessions
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == request.SessionId, cancellationToken);

        if (session is null)
        {
            return Result.NotFound();
        }

        var userId = _currentSession.UserId.Value;
        if (userId == Guid.Empty)
        {
            return Result.Unauthorized();
        }

        var isRegistered = await _context.UserSessions
            .AsNoTracking()
            .AnyAsync(x => x.SessionId == request.SessionId && x.UserId == userId, cancellationToken);

        if (!isRegistered)
        {
            return Result.Forbidden();
        }

        var anamSession = await _aiTrainerService.CreateTrainingSessionAsync(
            session.Id,
            session.FormationId,
            request.Question,
            cancellationToken);

        return new AskAnamResponse(session.Id, session.FormationId, request.Question, anamSession.SessionToken);
    }
}
