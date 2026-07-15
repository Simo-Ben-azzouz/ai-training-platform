using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;
using System;

namespace Boilerplate.Application.Features.Session.CreateSession;

public record CreateSessionRequest(
    FormationId FormationId,
    string Title,
    DateTime StartDate,
    DateTime EndDate,
    string MeetingLink) : IRequest<Result<SessionResponse>>;
