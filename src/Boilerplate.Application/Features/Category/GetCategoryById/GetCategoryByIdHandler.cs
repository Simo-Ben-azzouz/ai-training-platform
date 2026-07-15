using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Category.GetCategoryById;

public class GetCategoryByIdHandler : IRequestHandler<GetCategoryByIdRequest, Result<CategoryResponse>>
{
    private readonly IContext _context;

    public GetCategoryByIdHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result<CategoryResponse>> Handle(GetCategoryByIdRequest request, CancellationToken cancellationToken)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (category is null) return Result.NotFound();

        return Mapper.ToCategoryDto(category);
    }
}
