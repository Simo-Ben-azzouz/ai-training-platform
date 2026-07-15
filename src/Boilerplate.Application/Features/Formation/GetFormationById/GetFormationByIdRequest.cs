using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;

namespace Boilerplate.Application.Features.Formation.GetFormationById;

public record GetFormationByIdRequest(FormationId Id) : IRequest<Result<FormationResponse>>;
