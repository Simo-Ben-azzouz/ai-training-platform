using Boilerplate.Domain.Entities.Common;

namespace Boilerplate.Application.Features.Anam.AskAnam;

public record AskAnamResponse(
    SessionId SessionId,
    FormationId FormationId,
    string Question,
    string SessionToken);
