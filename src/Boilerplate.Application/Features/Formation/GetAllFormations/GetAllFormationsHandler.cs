using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Formation.GetAllFormations;

public class GetAllFormationsHandler : IRequestHandler<GetAllFormationsRequest, List<FormationResponse>>
{
    private readonly IContext _context;

    public GetAllFormationsHandler(IContext context)
    {
        _context = context;
    }

    public async Task<List<FormationResponse>> Handle(GetAllFormationsRequest request, CancellationToken cancellationToken)
    {
        return await _context.Formations.ProjectToResponse().ToListAsync(cancellationToken);
    }
}
