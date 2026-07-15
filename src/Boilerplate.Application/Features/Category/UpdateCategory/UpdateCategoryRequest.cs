using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;
using System.Text.Json.Serialization;

namespace Boilerplate.Application.Features.Category.UpdateCategory;

public record UpdateCategoryRequest : IRequest<Result<CategoryResponse>>
{
    [JsonIgnore]
    public CategoryId Id { get; init; }

    public string Name { get; init; } = null!;
    public string Description { get; init; } = null!;
}
