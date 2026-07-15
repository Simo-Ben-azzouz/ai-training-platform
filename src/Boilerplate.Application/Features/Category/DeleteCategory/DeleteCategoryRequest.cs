using Ardalis.Result;
using Boilerplate.Domain.Entities.Common;
using MediatR;

namespace Boilerplate.Application.Features.Category.DeleteCategory;

public record DeleteCategoryRequest(CategoryId Id) : IRequest<Result>;
