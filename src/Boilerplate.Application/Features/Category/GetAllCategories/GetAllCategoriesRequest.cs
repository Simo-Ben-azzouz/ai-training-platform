using MediatR;
using System.Collections.Generic;

namespace Boilerplate.Application.Features.Category.GetAllCategories;

public record GetAllCategoriesRequest : IRequest<List<CategoryResponse>>;
