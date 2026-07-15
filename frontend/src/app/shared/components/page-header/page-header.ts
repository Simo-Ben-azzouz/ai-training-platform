import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <header>
      <div>
        @if (eyebrow()) { <p class="eyebrow">{{ eyebrow() }}</p> }
        <h1>{{ title() }}</h1>
        @if (description()) { <p class="description">{{ description() }}</p> }
      </div>
      <div class="actions"><ng-content /></div>
    </header>
  `,
  styles: [`
    header { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 28px; }
    .eyebrow { margin: 0 0 8px; }
    h1 { margin: 0; font-size: clamp(1.75rem, 3vw, 2.45rem); line-height: 1.1; letter-spacing: 0; }
    .description { max-width: 680px; margin: 10px 0 0; color: var(--muted); line-height: 1.6; }
    .actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
    @media (max-width: 640px) { header { align-items: start; flex-direction: column; margin-bottom: 22px; } .actions { width: 100%; } }
  `]
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly eyebrow = input<string>();
}
