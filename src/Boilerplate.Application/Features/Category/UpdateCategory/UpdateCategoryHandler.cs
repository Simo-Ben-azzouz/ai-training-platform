using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Category.UpdateCategory;

public class UpdateCategoryHandler : IRequestHandler<UpdateCategoryRequest, Result<CategoryResponse>>
{
    private readonly IContext _context;

    public UpdateCategoryHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result<CategoryResponse>> Handle(UpdateCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (category is null) return Result.NotFound();

        category.Name = request.Name;
        category.Description = request.Description;

        _context.Categories.Update(category);
        await _context.SaveChangesAsync(cancellationToken);

        return Mapper.ToCategoryDto(category);
    }
}
