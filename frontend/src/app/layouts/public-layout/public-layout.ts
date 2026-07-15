import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BrandMark } from '../../shared/components/brand-mark/brand-mark';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, BrandMark, ThemeToggle],
  template: `
    <header class="public-nav">
      <div class="page-wrap nav-inner">
        <a routerLink="/" aria-label="Forma, accueil"><app-brand-mark /></a>
        <nav aria-label="Navigation principale">
          <a routerLink="/formations">Catalogue</a>
          <a routerLink="/sessions">Sessions</a>
          <app-theme-toggle />
          <a class="login-link focus-ring" routerLink="/login">Se connecter</a>
        </nav>
      </div>
    </header>
    <main><router-outlet /></main>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
    .public-nav { position: absolute; inset: 0 0 auto; z-index: 20; height: 76px; border-bottom: 1px solid transparent; }
    .nav-inner { height: 100%; display: flex; align-items: center; justify-content: space-between; }
    nav { display: flex; align-items: center; gap: 24px; font-size: .9rem; font-weight: 500; }
    nav > a:not(.login-link) { color: var(--muted); transition: color 160ms ease; }
    nav > a:hover { color: var(--ink); }
    .login-link { padding: 10px 15px; border-radius: 6px; background: var(--ink); color: var(--surface); }
    @media (max-width: 640px) { nav > a:not(.login-link) { display: none; } nav { gap: 9px; } .login-link { padding: 9px 11px; } }
  `]
})
export class PublicLayout {}
