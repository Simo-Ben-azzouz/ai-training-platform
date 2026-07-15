using Boilerplate.Application.Common;
using FluentValidation;

namespace Boilerplate.Application.Features.Category.CreateCategory;

public class CreateCategoryValidator : AbstractValidator<CreateCategoryRequest>
{
    public CreateCategoryValidator()
    {
        RuleLevelCascadeMode = ClassLevelCascadeMode;

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(250);

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(2000);
    }
}
