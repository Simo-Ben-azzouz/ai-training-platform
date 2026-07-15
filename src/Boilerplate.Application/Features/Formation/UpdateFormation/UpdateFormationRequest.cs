using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;
using System.Text.Json.Serialization;

namespace Boilerplate.Application.Features.Formation.UpdateFormation;

public record UpdateFormationRequest : IRequest<Result<FormationResponse>>
{
    [JsonIgnore]
    public FormationId Id { get; init; }

    public string Title { get; init; } = null!;
    public string Description { get; init; } = null!;
    public int Duration { get; init; }
    public string Level { get; init; } = null!;
    public CategoryId CategoryId { get; init; }
}
