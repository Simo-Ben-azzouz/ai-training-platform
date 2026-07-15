using Boilerplate.Domain.Entities.Common;
using System;

namespace Boilerplate.Application.Features.Session;

public record SessionResponse(
    SessionId Id,
    FormationId FormationId,
    string Title,
    DateTime StartDate,
    DateTime EndDate,
    string MeetingLink);
