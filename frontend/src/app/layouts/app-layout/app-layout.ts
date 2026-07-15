import { Component, inject, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { BrandMark } from '../../shared/components/brand-mark/brand-mark';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';

interface NavItem { label: string; icon: string; route: string; }

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, BrandMark, ThemeToggle, MatTooltipModule],
  template: `
    <div class="shell" [class.menu-open]="menuOpen()">
      <aside>
        <div class="brand-row">
          <a routerLink="/dashboard"><app-brand-mark /></a>
          <button class="close-menu" type="button" (click)="menuOpen.set(false)" aria-label="Fermer le menu"><span class="material-symbols-rounded">close</span></button>
        </div>
        <nav aria-label="Navigation de l'espace apprenant">
          @for (item of primaryNav; track item.route) {
            <a [routerLink]="item.route" routerLinkActive="active" (click)="menuOpen.set(false)">
              <span class="material-symbols-rounded">{{ item.icon }}</span><span>{{ item.label }}</span>
            </a>
          }
          <p>Mon espace</p>
          @for (item of personalNav; track item.route) {
            <a [routerLink]="item.route" routerLinkActive="active" (click)="menuOpen.set(false)">
              <span class="material-symbols-rounded">{{ item.icon }}</span><span>{{ item.label }}</span>
            </a>
          }
        </nav>
        <div class="sidebar-foot">
          <a routerLink="/profile" routerLinkActive="active" class="profile-link">
            <span class="avatar">{{ auth.currentUser()?.initials }}</span>
            <span class="profile-copy"><strong>{{ auth.currentUser()?.name }}</strong><small>Voir mon profil</small></span>
            <span class="material-symbols-rounded">chevron_right</span>
          </a>
        </div>
      </aside>

      @if (menuOpen()) { <button class="scrim" type="button" (click)="menuOpen.set(false)" aria-label="Fermer le menu"></button> }

      <section class="workspace" @shellEnter>
        <header class="topbar">
          <button class="menu-button focus-ring" type="button" (click)="menuOpen.set(true)" aria-label="Ouvrir le menu"><span class="material-symbols-rounded">menu</span></button>
          <div class="quick-search"><span class="material-symbols-rounded">search</span><span>Rechercher une formation</span><kbd>Ctrl K</kbd></div>
          <div class="top-actions">
            <app-theme-toggle />
            <button class="icon-button focus-ring" type="button" matTooltip="Notifications" aria-label="Notifications"><span class="material-symbols-rounded">notifications</span><i></i></button>
          </div>
        </header>
        <main class="content"><router-outlet /></main>
      </section>
    </div>
  `,
  animations: [
    trigger('shellEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(6px)' }),
        animate('220ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  styles: [`
    :host { display: block; min-height: 100vh; }
    .shell { min-height: 100vh; display: grid; grid-template-columns: 252px minmax(0, 1fr); }
    aside { position: fixed; inset: 0 auto 0 0; width: 252px; z-index: 40; display: flex; flex-direction: column; padding: 22px 14px 16px; background: var(--surface); border-right: 1px solid var(--border); }
    .brand-row { height: 44px; padding: 0 10px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
    .close-menu { display: none; }
    nav { display: flex; flex-direction: column; gap: 4px; }
    nav p { margin: 22px 12px 8px; color: var(--muted); font-size: .7rem; font-weight: 700; text-transform: uppercase; }
    nav a { min-height: 43px; padding: 0 12px; display: flex; align-items: center; gap: 12px; border-radius: 6px; color: var(--muted); font-size: .9rem; font-weight: 500; transition: background 150ms ease, color 150ms ease, transform 150ms ease; }
    nav a:hover { color: var(--ink); background: var(--surface-2); transform: translateX(2px); }
    nav a.active { color: var(--brand-strong); background: color-mix(in srgb, var(--brand) 12%, transparent); }
    nav .material-symbols-rounded { font-size: 21px; }
    .sidebar-foot { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border); }
    .profile-link { min-height: 54px; padding: 6px 8px; display: flex; align-items: center; gap: 10px; border-radius: 7px; }
    .profile-link:hover { background: var(--surface-2); }
    .avatar { width: 36px; height: 36px; flex: 0 0 36px; border-radius: 50%; display: grid; place-items: center; background: var(--ink); color: var(--surface); font-size: .75rem; font-weight: 700; }
    .profile-copy { min-width: 0; display: grid; flex: 1; }
    .profile-copy strong, .profile-copy small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .profile-copy strong { font-size: .8rem; } .profile-copy small { margin-top: 3px; color: var(--muted); font-size: .7rem; }
    .profile-link > .material-symbols-rounded { color: var(--muted); font-size: 18px; }
    .workspace { grid-column: 2; min-width: 0; }
    .topbar { position: sticky; top: 0; z-index: 30; height: 72px; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; background: var(--surface-raised); border-bottom: 1px solid var(--border); backdrop-filter: blur(16px); }
    .quick-search { width: min(440px, 48vw); height: 40px; padding: 0 10px; display: flex; align-items: center; gap: 9px; color: var(--muted); background: var(--surface-2); border: 1px solid transparent; border-radius: 6px; font-size: .83rem; }
    .quick-search .material-symbols-rounded { font-size: 19px; }
    kbd { margin-left: auto; padding: 2px 6px; border: 1px solid var(--border); border-radius: 4px; background: var(--surface); font-size: .65rem; }
    .top-actions { display: flex; gap: 8px; }
    .icon-button, .menu-button, .close-menu { width: 40px; height: 40px; border: 1px solid var(--border); border-radius: 7px; color: var(--ink); background: var(--surface); cursor: pointer; place-items: center; position: relative; }
    .icon-button { display: grid; } .icon-button i { position: absolute; top: 8px; right: 8px; width: 6px; height: 6px; border-radius: 50%; background: var(--danger); }
    .menu-button { display: none; }
    .content { width: min(1280px, 100%); margin: 0 auto; padding: 36px 38px 64px; }
    .scrim { display: none; }
    @media (max-width: 900px) {
      .shell { grid-template-columns: 1fr; }
      aside { transform: translateX(-105%); transition: transform 220ms ease; box-shadow: var(--shadow); }
      .menu-open aside { transform: translateX(0); }
      .close-menu { display: grid; }
      .workspace { grid-column: 1; }
      .menu-button { display: grid; }
      .topbar { padding: 0 22px; }
      .scrim { display: block; position: fixed; inset: 0; z-index: 35; border: 0; background: rgba(0, 0, 0, .42); }
    }
    @media (max-width: 620px) {
      .topbar { height: 64px; padding: 0 14px; }
      .quick-search { width: auto; flex: 1; margin: 0 10px; } .quick-search span:nth-child(2), kbd { display: none; }
      .content { padding: 28px 16px 52px; }
    }
  `]
})
export class AppLayout {
  readonly auth = inject(AuthService);
  readonly menuOpen = signal(false);
  private readonly router = inject(Router);

  readonly primaryNav: NavItem[] = [
    { label: 'Vue d\'ensemble', icon: 'space_dashboard', route: '/dashboard' },
    { label: 'Categories', icon: 'grid_view', route: '/categories' },
    { label: 'Formations', icon: 'local_library', route: '/formations' },
    { label: 'Sessions', icon: 'calendar_month', route: '/sessions' }
  ];

  readonly personalNav: NavItem[] = [
    { label: 'Mes sessions', icon: 'bookmark', route: '/my-sessions' },
    { label: 'Coach IA', icon: 'neurology', route: '/anam' }
  ];

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }
}
