import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-state-panel',
  standalone: true,
  template: `
    <div class="state" role="status">
      <span class="material-symbols-rounded">{{ icon() }}</span>
      <h2>{{ title() }}</h2>
      <p>{{ message() }}</p>
      @if (actionLabel()) {
        <button type="button" class="focus-ring" (click)="action.emit()">{{ actionLabel() }}</button>
      }
    </div>
  `,
  styles: [`
    .state { min-height: 260px; padding: 44px 24px; border: 1px dashed var(--border); border-radius: 8px; display: grid; place-items: center; align-content: center; text-align: center; background: var(--surface); }
    .material-symbols-rounded { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%; color: var(--brand); background: color-mix(in srgb, var(--brand) 12%, transparent); font-size: 26px; }
    h2 { margin: 16px 0 6px; font-size: 1.05rem; }
    p { max-width: 440px; margin: 0; color: var(--muted); line-height: 1.55; }
    button { margin-top: 18px; border: 0; border-radius: 6px; background: var(--brand); color: white; padding: 10px 16px; font-weight: 600; cursor: pointer; }
  `]
})
export class StatePanel {
  readonly icon = input('inbox');
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly actionLabel = input<string>();
  readonly action = output<void>();
}
