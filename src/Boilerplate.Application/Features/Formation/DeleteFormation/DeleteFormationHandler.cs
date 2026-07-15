using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Formation.DeleteFormation;

public class DeleteFormationHandler : IRequestHandler<DeleteFormationRequest, Result>
{
    private readonly IContext _context;

    public DeleteFormationHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteFormationRequest request, CancellationToken cancellationToken)
    {
        var formation = await _context.Formations.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (formation is null) return Result.NotFound();

        _context.Formations.Remove(formation);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
