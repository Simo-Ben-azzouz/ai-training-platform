using MediatR;
using System.Collections.Generic;

namespace Boilerplate.Application.Features.Formation.GetAllFormations;

public record GetAllFormationsRequest : IRequest<List<FormationResponse>>;
