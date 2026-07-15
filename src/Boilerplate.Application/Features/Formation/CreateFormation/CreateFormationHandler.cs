using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Formation.CreateFormation;

public class CreateFormationHandler : IRequestHandler<CreateFormationRequest, Result<FormationResponse>>
{
    private readonly IContext _context;

    public CreateFormationHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result<FormationResponse>> Handle(CreateFormationRequest request, CancellationToken cancellationToken)
    {
        var created = Mapper.ToFormationEntity(request);
        _context.Formations.Add(created);
        await _context.SaveChangesAsync(cancellationToken);
        return Mapper.ToFormationDto(created);
    }
}
