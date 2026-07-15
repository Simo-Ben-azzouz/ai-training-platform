using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Formation.GetFormationById;

public class GetFormationByIdHandler : IRequestHandler<GetFormationByIdRequest, Result<FormationResponse>>
{
    private readonly IContext _context;

    public GetFormationByIdHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result<FormationResponse>> Handle(GetFormationByIdRequest request, CancellationToken cancellationToken)
    {
        var formation = await _context.Formations.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (formation is null) return Result.NotFound();

        return Mapper.ToFormationDto(formation);
    }
}
