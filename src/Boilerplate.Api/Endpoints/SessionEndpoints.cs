using Ardalis.Result.AspNetCore;
using Boilerplate.Application.Features.Session.CreateSession;
using Boilerplate.Application.Features.Session.DeleteSession;
using Boilerplate.Application.Features.Session.GetAllSessions;
using Boilerplate.Application.Features.Session.GetSessionById;
using Boilerplate.Application.Features.Session.UpdateSession;
using Boilerplate.Domain.Entities.Common;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Boilerplate.Api.Endpoints;

public static class SessionEndpoints
{
    public static void MapSessionEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("api/Session")
            .WithTags("Session");

        group.MapGet("/", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetAllSessionsRequest());
            return result;
        });

        group.MapGet("{id}", async (IMediator mediator, SessionId id) =>
        {
            var result = await mediator.Send(new GetSessionByIdRequest(id));
            return result.ToMinimalApiResult();
        });

        group.MapPost("/", async (IMediator mediator, CreateSessionRequest request) =>
        {
            var result = await mediator.Send(request);
            return result.ToMinimalApiResult();
        });

        group.MapPut("{id}", async (IMediator mediator, SessionId id, UpdateSessionRequest request) =>
        {
            var result = await mediator.Send(request with { Id = id });
            return result.ToMinimalApiResult();
        });

        group.MapDelete("{id}", async (IMediator mediator, SessionId id) =>
        {
            var result = await mediator.Send(new DeleteSessionRequest(id));
            return result.ToMinimalApiResult();
        });
    }
}
