using Boilerplate.Application.Common;
using Boilerplate.Domain.Entities.Common;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Formation.CreateFormation;

public class CreateFormationValidator : AbstractValidator<CreateFormationRequest>
{
    private readonly IContext _context;

    public CreateFormationValidator(IContext context)
    {
        _context = context;

        RuleLevelCascadeMode = ClassLevelCascadeMode;

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(250);

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(2000);

        RuleFor(x => x.Duration)
            .GreaterThan(0);

        RuleFor(x => x.Level)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.CategoryId)
            .MustAsync(CategoryExistsAsync)
            .WithMessage("La catégorie spécifiée n'existe pas.");
    }

    private async Task<bool> CategoryExistsAsync(CategoryId categoryId, CancellationToken cancellationToken)
    {
        return await _context.Categories.AnyAsync(x => x.Id == categoryId, cancellationToken);
    }
}
