using Boilerplate.Application.Features.Formation.CreateFormation;
using Boilerplate.Domain.Entities;
using Riok.Mapperly.Abstractions;
using System.Linq;

namespace Boilerplate.Application.Features.Formation;

[Mapper]
public static partial class Mapper
{
    [MapperIgnoreTarget(nameof(Boilerplate.Domain.Entities.Formation.Id))]
    [MapperIgnoreTarget(nameof(Boilerplate.Domain.Entities.Formation.Category))]
    [MapperIgnoreTarget(nameof(Boilerplate.Domain.Entities.Formation.Sessions))]
    public static partial Boilerplate.Domain.Entities.Formation ToFormationEntity(CreateFormationRequest dto);

    [MapperIgnoreSource(nameof(Boilerplate.Domain.Entities.Formation.Category))]
    [MapperIgnoreSource(nameof(Boilerplate.Domain.Entities.Formation.Sessions))]
    public static partial FormationResponse ToFormationDto(Boilerplate.Domain.Entities.Formation entity);

    public static partial IQueryable<FormationResponse> ProjectToResponse(this IQueryable<Boilerplate.Domain.Entities.Formation> source);
}
