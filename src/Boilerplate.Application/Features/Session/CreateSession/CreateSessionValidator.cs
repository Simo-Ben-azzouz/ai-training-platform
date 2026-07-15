using Boilerplate.Application.Common;
using Boilerplate.Domain.Entities.Common;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Features.Session.CreateSession;

public class CreateSessionValidator : AbstractValidator<CreateSessionRequest>
{
    private readonly IContext _context;

    public CreateSessionValidator(IContext context)
    {
        _context = context;

        RuleLevelCascadeMode = ClassLevelCascadeMode;

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(250);

        RuleFor(x => x.MeetingLink)
            .NotEmpty()
            .MaximumLength(500)
            .Must(link => Uri.TryCreate(link, UriKind.Absolute, out _))
            .WithMessage("Le lien de réunion doit être une URL absolue valide.");

        RuleFor(x => x.StartDate)
            .NotEmpty();

        RuleFor(x => x.EndDate)
            .NotEmpty()
            .GreaterThan(x => x.StartDate)
            .WithMessage("La date de fin doit être postérieure à la date de début.");

        RuleFor(x => x.FormationId)
            .MustAsync(FormationExistsAsync)
            .WithMessage("La formation spécifiée n'existe pas.");
    }

    private async Task<bool> FormationExistsAsync(FormationId formationId, CancellationToken cancellationToken)
    {
        return await _context.Formations.AnyAsync(x => x.Id == formationId, cancellationToken);
    }
}
