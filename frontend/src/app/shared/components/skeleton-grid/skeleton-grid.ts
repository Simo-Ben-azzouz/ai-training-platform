import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton-grid',
  standalone: true,
  template: `<div class="grid" aria-label="Chargement en cours">@for (item of items(); track item) { <div class="skeleton"><span></span><span></span><span></span></div> }</div>`,
  styles: [`
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
    .skeleton { height: 210px; padding: 22px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); overflow: hidden; }
    span { display: block; height: 14px; margin-bottom: 14px; border-radius: 4px; background: linear-gradient(90deg, var(--surface-2) 25%, color-mix(in srgb, var(--surface-2) 55%, var(--surface)) 50%, var(--surface-2) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
    span:first-child { width: 44px; height: 44px; margin-bottom: 28px; }
    span:nth-child(2) { width: 75%; } span:nth-child(3) { width: 92%; }
    @keyframes shimmer { to { background-position: -200% 0; } }
    @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
  `]
})
export class SkeletonGrid {
  readonly count = input(6);
  readonly items = () => Array.from({ length: this.count() }, (_, index) => index);
}
