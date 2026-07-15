using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Formation.UpdateFormation;

public class UpdateFormationHandler : IRequestHandler<UpdateFormationRequest, Result<FormationResponse>>
{
    private readonly IContext _context;

    public UpdateFormationHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result<FormationResponse>> Handle(UpdateFormationRequest request, CancellationToken cancellationToken)
    {
        var formation = await _context.Formations.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (formation is null) return Result.NotFound();

        formation.Title = request.Title;
        formation.Description = request.Description;
        formation.Duration = request.Duration;
        formation.Level = request.Level;
        formation.CategoryId = request.CategoryId;

        _context.Formations.Update(formation);
        await _context.SaveChangesAsync(cancellationToken);

        return Mapper.ToFormationDto(formation);
    }
}
