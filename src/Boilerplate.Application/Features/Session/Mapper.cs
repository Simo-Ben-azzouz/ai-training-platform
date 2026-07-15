using Boilerplate.Application.Features.Session.CreateSession;
using Boilerplate.Domain.Entities;
using Riok.Mapperly.Abstractions;
using System.Linq;

namespace Boilerplate.Application.Features.Session;

[Mapper]
public static partial class Mapper
{
    [MapperIgnoreTarget(nameof(Boilerplate.Domain.Entities.Session.Id))]
    [MapperIgnoreTarget(nameof(Boilerplate.Domain.Entities.Session.Formation))]
    [MapperIgnoreTarget(nameof(Boilerplate.Domain.Entities.Session.UserSessions))]
    public static partial Boilerplate.Domain.Entities.Session ToSessionEntity(CreateSessionRequest dto);

    [MapperIgnoreSource(nameof(Boilerplate.Domain.Entities.Session.Formation))]
    [MapperIgnoreSource(nameof(Boilerplate.Domain.Entities.Session.UserSessions))]
    public static partial SessionResponse ToSessionDto(Boilerplate.Domain.Entities.Session entity);

    public static partial IQueryable<SessionResponse> ProjectToResponse(this IQueryable<Boilerplate.Domain.Entities.Session> source);
}
