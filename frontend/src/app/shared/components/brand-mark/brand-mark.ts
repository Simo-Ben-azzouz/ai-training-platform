import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-mark',
  standalone: true,
  template: `
    <span class="mark" aria-hidden="true"><span></span><span></span><span></span></span>
    <span class="wordmark">forma</span>
  `,
  styles: [`
    :host { display: inline-flex; align-items: center; gap: 10px; font-weight: 700; font-size: 1.05rem; }
    .mark { width: 28px; height: 28px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px; transform: rotate(-4deg); }
    .mark span { display: block; border-radius: 3px; background: var(--brand); }
    .mark span:first-child { grid-row: span 2; }
    .mark span:nth-child(2) { background: var(--teal); }
    .mark span:nth-child(3) { background: var(--amber); }
    .wordmark { letter-spacing: 0; }
  `]
})
export class BrandMark {}
