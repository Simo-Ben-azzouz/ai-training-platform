using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;

namespace Boilerplate.Application.Features.Session.GetSessionById;

public record GetSessionByIdRequest(SessionId Id) : IRequest<Result<SessionResponse>>;
