using Ardalis.Result;
using MediatR;

namespace Boilerplate.Application.Features.Category.CreateCategory;

public record CreateCategoryRequest(string Name, string Description) : IRequest<Result<CategoryResponse>>;
