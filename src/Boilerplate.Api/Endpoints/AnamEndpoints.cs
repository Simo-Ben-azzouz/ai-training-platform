using Ardalis.Result.AspNetCore;
using Boilerplate.Application.Features.Anam.AskAnam;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Boilerplate.Api.Endpoints;

public static class AnamEndpoints
{
    public static void MapAnamEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("api/Anam")
            .WithTags("Anam")
            .RequireAuthorization();

        group.MapPost("ask", async (IMediator mediator, AskAnamRequest request) =>
        {
            var result = await mediator.Send(request);
            return result.ToMinimalApiResult();
        });
    }
}
