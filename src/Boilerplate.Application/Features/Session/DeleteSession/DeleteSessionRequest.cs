using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;

namespace Boilerplate.Application.Features.Session.DeleteSession;

public record DeleteSessionRequest(SessionId Id) : IRequest<Result>;
