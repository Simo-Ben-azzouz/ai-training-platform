import { Component, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatTooltipModule],
  template: `
    <button class="icon-button focus-ring" type="button" (click)="theme.toggle()"
      [matTooltip]="theme.mode() === 'light' ? 'Activer le theme sombre' : 'Activer le theme clair'"
      [attr.aria-label]="theme.mode() === 'light' ? 'Activer le theme sombre' : 'Activer le theme clair'">
      <span class="material-symbols-rounded">{{ theme.mode() === 'light' ? 'dark_mode' : 'light_mode' }}</span>
    </button>
  `,
  styles: [`
    .icon-button { width: 40px; height: 40px; border: 1px solid var(--border); border-radius: 7px; background: var(--surface); color: var(--ink); cursor: pointer; display: grid; place-items: center; transition: transform 160ms ease, background 160ms ease; }
    .icon-button:hover { transform: translateY(-1px); background: var(--surface-2); }
  `]
})
export class ThemeToggle {
  readonly theme = inject(ThemeService);
}
