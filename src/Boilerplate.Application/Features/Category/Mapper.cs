using Boilerplate.Application.Features.Category.CreateCategory;
using Boilerplate.Domain.Entities;
using Riok.Mapperly.Abstractions;
using System.Linq;

namespace Boilerplate.Application.Features.Category;

[Mapper]
public static partial class Mapper
{
    [MapperIgnoreTarget(nameof(Boilerplate.Domain.Entities.Category.Id))]
    [MapperIgnoreTarget(nameof(Boilerplate.Domain.Entities.Category.Formations))]
    public static partial Boilerplate.Domain.Entities.Category ToCategoryEntity(CreateCategoryRequest dto);

    [MapperIgnoreSource(nameof(Boilerplate.Domain.Entities.Category.Formations))]
    public static partial CategoryResponse ToCategoryDto(Boilerplate.Domain.Entities.Category entity);

    public static partial IQueryable<CategoryResponse> ProjectToResponse(this IQueryable<Boilerplate.Domain.Entities.Category> source);
}
