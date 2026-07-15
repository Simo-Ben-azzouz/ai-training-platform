using Ardalis.Result.AspNetCore;
using Boilerplate.Application.Features.Formation.CreateFormation;
using Boilerplate.Application.Features.Formation.DeleteFormation;
using Boilerplate.Application.Features.Formation.GetAllFormations;
using Boilerplate.Application.Features.Formation.GetFormationById;
using Boilerplate.Application.Features.Formation.UpdateFormation;
using Boilerplate.Domain.Entities.Common;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Boilerplate.Api.Endpoints;

public static class FormationEndpoints
{
    public static void MapFormationEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("api/Formation")
            .WithTags("Formation");

        group.MapGet("/", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetAllFormationsRequest());
            return result;
        });

        group.MapGet("{id}", async (IMediator mediator, FormationId id) =>
        {
            var result = await mediator.Send(new GetFormationByIdRequest(id));
            return result.ToMinimalApiResult();
        });

        group.MapPost("/", async (IMediator mediator, CreateFormationRequest request) =>
        {
            var result = await mediator.Send(request);
            return result.ToMinimalApiResult();
        });

        group.MapPut("{id}", async (IMediator mediator, FormationId id, UpdateFormationRequest request) =>
        {
            var result = await mediator.Send(request with { Id = id });
            return result.ToMinimalApiResult();
        });

        group.MapDelete("{id}", async (IMediator mediator, FormationId id) =>
        {
            var result = await mediator.Send(new DeleteFormationRequest(id));
            return result.ToMinimalApiResult();
        });
    }
}
