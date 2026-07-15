using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;

namespace Boilerplate.Application.Features.Anam.AskAnam;

public record AskAnamRequest(
    SessionId SessionId,
    string Question) : IRequest<Result<AskAnamResponse>>;
