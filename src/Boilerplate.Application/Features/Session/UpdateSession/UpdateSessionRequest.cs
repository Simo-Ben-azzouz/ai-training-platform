using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;
using System;
using System.Text.Json.Serialization;

namespace Boilerplate.Application.Features.Session.UpdateSession;

public record UpdateSessionRequest : IRequest<Result<SessionResponse>>
{
    [JsonIgnore]
    public SessionId Id { get; init; }

    public FormationId FormationId { get; init; }
    public string Title { get; init; } = null!;
    public DateTime StartDate { get; init; }
    public DateTime EndDate { get; init; }
    public string MeetingLink { get; init; } = null!;
}
