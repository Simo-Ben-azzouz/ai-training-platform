using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;

namespace Boilerplate.Application.Features.Formation.DeleteFormation;

public record DeleteFormationRequest(FormationId Id) : IRequest<Result>;
