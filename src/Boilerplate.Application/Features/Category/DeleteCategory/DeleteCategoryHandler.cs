using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Category.DeleteCategory;

public class DeleteCategoryHandler : IRequestHandler<DeleteCategoryRequest, Result>
{
    private readonly IContext _context;

    public DeleteCategoryHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteCategoryRequest request, CancellationToken cancellationToken)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (category is null) return Result.NotFound();

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
