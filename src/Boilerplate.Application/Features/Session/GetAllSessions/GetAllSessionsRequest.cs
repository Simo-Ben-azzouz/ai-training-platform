using MediatR;
using System.Collections.Generic;

namespace Boilerplate.Application.Features.Session.GetAllSessions;

public record GetAllSessionsRequest : IRequest<List<SessionResponse>>;
