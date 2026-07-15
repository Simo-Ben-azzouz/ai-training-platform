using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Category.GetAllCategories;

public class GetAllCategoriesHandler : IRequestHandler<GetAllCategoriesRequest, List<CategoryResponse>>
{
    private readonly IContext _context;

    public GetAllCategoriesHandler(IContext context)
    {
        _context = context;
    }

    public async Task<List<CategoryResponse>> Handle(GetAllCategoriesRequest request, CancellationToken cancellationToken)
    {
        return await _context.Categories.ProjectToResponse().ToListAsync(cancellationToken);
    }
}
