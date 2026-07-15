using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;

namespace Boilerplate.Application.Features.Category.GetCategoryById;

public record GetCategoryByIdRequest(CategoryId Id) : IRequest<Result<CategoryResponse>>;
