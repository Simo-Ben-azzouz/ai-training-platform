using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;

namespace Boilerplate.Application.Features.Formation.CreateFormation;

public record CreateFormationRequest(
    string Title,
    string Description,
    int Duration,
    string Level,
    CategoryId CategoryId) : IRequest<Result<FormationResponse>>;
