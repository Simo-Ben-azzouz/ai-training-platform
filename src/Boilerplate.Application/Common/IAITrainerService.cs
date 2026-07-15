using Boilerplate.Domain.Entities.Common;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Common;

public interface IAITrainerService
{
    Task<AnamTrainingSession> CreateTrainingSessionAsync(
        SessionId sessionId,
        FormationId formationId,
        string prompt,
        CancellationToken cancellationToken);
}

public record AnamTrainingSession(string SessionToken);
