using StronglyTypedIds;
using System;

[assembly: StronglyTypedIdDefaults(Template.Guid, "guid-efcore")]

namespace Boilerplate.Domain.Entities.Common;


public interface IGuid {}

[StronglyTypedId]
public partial struct UserId : IGuid
{
    public static implicit operator UserId(Guid guid)
    {
        return new UserId(guid);
    }
}

[StronglyTypedId]
public partial struct CategoryId : IGuid
{
    public static implicit operator CategoryId(Guid guid)
    {
        return new CategoryId(guid);
    }
}

[StronglyTypedId]
public partial struct FormationId : IGuid
{
    public static implicit operator FormationId(Guid guid)
    {
        return new FormationId(guid);
    }
}

[StronglyTypedId]
public partial struct SessionId : IGuid
{
    public static implicit operator SessionId(Guid guid)
    {
        return new SessionId(guid);
    }
}

[StronglyTypedId]
public partial struct UserSessionId : IGuid
{
    public static implicit operator UserSessionId(Guid guid)
    {
        return new UserSessionId(guid);
    }
}
