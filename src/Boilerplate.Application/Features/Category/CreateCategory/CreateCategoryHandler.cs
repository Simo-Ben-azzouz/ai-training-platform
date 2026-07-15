using Ardalis.Result;
using Boilerplate.Application.Common;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Category.CreateCategory;

public class CreateCategoryHandler : IRequestHandler<CreateCategoryRequest, Result<CategoryResponse>>
{
    private readonly IContext _context;

    public CreateCategoryHandler(IContext context)
    {
        _context = context;
    }

    public async Task<Result<CategoryResponse>> Handle(CreateCategoryRequest request, CancellationToken cancellationToken)
    {
        var created = Mapper.ToCategoryEntity(request);
        _context.Categories.Add(created);
        await _context.SaveChangesAsync(cancellationToken);
        return Mapper.ToCategoryDto(created);
    }
}
