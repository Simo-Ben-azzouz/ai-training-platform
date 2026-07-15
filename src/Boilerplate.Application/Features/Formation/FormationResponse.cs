using Boilerplate.Domain.Entities.Common;
using System;

namespace Boilerplate.Application.Features.Formation;

public record FormationResponse(
    FormationId Id,
    string Title,
    string Description,
    int Duration,
    string Level,
    CategoryId CategoryId);
