using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Session.GetAllSessions;

public class GetAllSessionsHandler : IRequestHandler<GetAllSessionsRequest, List<SessionResponse>>
{
    private readonly IContext _context;

    public GetAllSessionsHandler(IContext context)
    {
        _context = context;
    }

    public async Task<List<SessionResponse>> Handle(GetAllSessionsRequest request, CancellationToken cancellationToken)
    {
        return await _context.Sessions.ProjectToResponse().ToListAsync(cancellationToken);
    }
}
