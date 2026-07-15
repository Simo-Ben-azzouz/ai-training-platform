using FluentValidation;

namespace Boilerplate.Application.Features.Category.UpdateCategory;

public class UpdateCategoryValidator : AbstractValidator<UpdateCategoryRequest>
{
    public UpdateCategoryValidator()
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
