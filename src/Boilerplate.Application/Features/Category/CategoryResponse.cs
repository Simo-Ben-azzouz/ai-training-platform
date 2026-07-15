using Boilerplate.Domain.Entities.Common;
using System;

namespace Boilerplate.Application.Features.Category;

public record CategoryResponse(
    CategoryId Id,
    string Name,
    string Description);
