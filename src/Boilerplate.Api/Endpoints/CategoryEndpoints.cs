using Ardalis.Result.AspNetCore;
using Boilerplate.Application.Features.Category.CreateCategory;
using Boilerplate.Application.Features.Category.DeleteCategory;
using Boilerplate.Application.Features.Category.GetAllCategories;
using Boilerplate.Application.Features.Category.GetCategoryById;
using Boilerplate.Application.Features.Category.UpdateCategory;
using Boilerplate.Domain.Entities.Common;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Boilerplate.Api.Endpoints;

public static class CategoryEndpoints
{
    public static void MapCategoryEndpoints(this IEndpointRouteBuilder builder)
    {
        var group = builder.MapGroup("api/Category")
            .WithTags("Category");

        group.MapGet("/", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetAllCategoriesRequest());
            return result;
        });

        group.MapGet("{id}", async (IMediator mediator, CategoryId id) =>
        {
            var result = await mediator.Send(new GetCategoryByIdRequest(id));
            return result.ToMinimalApiResult();
        });

        group.MapPost("/", async (IMediator mediator, CreateCategoryRequest request) =>
        {
            var result = await mediator.Send(request);
            return result.ToMinimalApiResult();
        });

        group.MapPut("{id}", async (IMediator mediator, CategoryId id, UpdateCategoryRequest request) =>
        {
            var result = await mediator.Send(request with { Id = id });
            return result.ToMinimalApiResult();
        });

        group.MapDelete("{id}", async (IMediator mediator, CategoryId id) =>
        {
            var result = await mediator.Send(new DeleteCategoryRequest(id));
            return result.ToMinimalApiResult();
        });
    }
}
