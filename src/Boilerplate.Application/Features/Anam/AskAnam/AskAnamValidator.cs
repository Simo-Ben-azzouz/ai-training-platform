using Boilerplate.Domain.Entities.Common;
using FluentValidation;

namespace Boilerplate.Application.Features.Anam.AskAnam;

public class AskAnamValidator : AbstractValidator<AskAnamRequest>
{
    public AskAnamValidator()
    {
        RuleLevelCascadeMode = ClassLevelCascadeMode;

        RuleFor(x => x.SessionId)
            .NotEqual(SessionId.Empty);

        RuleFor(x => x.Question)
            .NotEmpty()
            .MaximumLength(2000);
    }
}
