import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `
    <section class="login-page">
      <div class="login-panel">
        <a routerLink="/" class="back"><span class="material-symbols-rounded">arrow_back</span> Retour a l'accueil</a>
        <div class="login-copy"><p class="eyebrow">Espace apprenant</p><h1>Ravi de vous revoir.</h1><p>Connectez-vous pour retrouver vos formations et vos prochaines sessions.</p></div>
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <mat-form-field appearance="outline">
            <mat-label>Adresse e-mail</mat-label>
            <input matInput type="email" formControlName="email" autocomplete="email">
            <mat-icon matSuffix>mail</mat-icon>
            @if (form.controls.email.touched && form.controls.email.invalid) { <mat-error>Saisissez une adresse e-mail valide.</mat-error> }
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Mot de passe</mat-label>
            <input matInput [type]="showPassword() ? 'text' : 'password'" formControlName="password" autocomplete="current-password">
            <button mat-icon-button matSuffix type="button" (click)="showPassword.set(!showPassword())" [attr.aria-label]="showPassword() ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"><mat-icon>{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon></button>
            @if (form.controls.password.touched && form.controls.password.invalid) { <mat-error>Le mot de passe est requis.</mat-error> }
          </mat-form-field>
          <div class="form-meta"><label><input type="checkbox"> Rester connecte</label><a href="mailto:support@forma.ma">Mot de passe oublie ?</a></div>
          @if (error()) { <div class="error" role="alert"><span class="material-symbols-rounded">error</span>{{ error() }}</div> }
          <button mat-flat-button class="submit" type="submit" [disabled]="loading()">
            @if (loading()) { <span class="spinner"></span> Connexion... } @else { <span>Se connecter</span> <span class="material-symbols-rounded">arrow_forward</span> }
          </button>
        </form>
        <p class="support">Vous n'avez pas encore de compte ? <a href="mailto:support@forma.ma">Contacter votre administrateur</a></p>
      </div>
      <aside class="login-visual" aria-hidden="true"><div class="quote"><span class="material-symbols-rounded">format_quote</span><blockquote>La formation est l'essence de tout succes.</blockquote><p>Une experience pensee pour rester concentre sur l'essentiel.</p></div><div class="rings"><i></i><i></i><i></i><b><span class="material-symbols-rounded">school</span></b></div></aside>
    </section>
  `,
  styles: [`
    :host{display:block;min-height:100vh}.login-page{min-height:100vh;display:grid;grid-template-columns:minmax(480px,.88fr) minmax(480px,1.12fr);background:var(--surface)}.login-panel{width:min(100%,540px);margin:auto;padding:110px 48px 54px}.back{display:inline-flex;align-items:center;gap:7px;color:var(--muted);font-size:.8rem}.back .material-symbols-rounded{font-size:17px}.login-copy{margin:70px 0 34px}.login-copy .eyebrow{margin:0 0 12px}.login-copy h1{margin:0;font-size:2.45rem;letter-spacing:0}.login-copy>p:last-child{margin:14px 0 0;color:var(--muted);line-height:1.6}form{display:grid;gap:4px}mat-form-field{width:100%}.form-meta{display:flex;align-items:center;justify-content:space-between;margin:3px 0 18px;font-size:.78rem;color:var(--muted)}.form-meta label{display:flex;align-items:center;gap:7px}.form-meta a,.support a{color:var(--brand-strong);font-weight:600}.error{margin-bottom:12px;padding:11px 13px;display:flex;align-items:center;gap:8px;border-radius:6px;background:color-mix(in srgb,var(--danger) 10%,transparent);color:var(--danger);font-size:.8rem}.error span{font-size:19px}.submit{height:48px!important;border-radius:6px!important;background:var(--ink)!important;color:var(--surface)!important}.spinner{width:16px;height:16px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:spin .7s linear infinite}.support{margin:26px 0 0;text-align:center;color:var(--muted);font-size:.78rem}.login-visual{position:relative;overflow:hidden;display:flex;align-items:flex-end;padding:64px;background:#292b35;color:white}.login-visual:before{content:'';position:absolute;inset:0;background:linear-gradient(145deg,#292b35,#414477 56%,#177b70);opacity:.96}.quote{position:relative;z-index:2;max-width:460px}.quote>.material-symbols-rounded{font-size:36px;color:#9fa1ff}.quote blockquote{margin:14px 0 12px;font-size:clamp(2rem,4vw,3.3rem);font-weight:600;line-height:1.1}.quote p{max-width:360px;color:rgba(255,255,255,.7);line-height:1.6}.rings{position:absolute;top:8%;right:-5%;width:440px;height:440px}.rings i{position:absolute;inset:0;border:1px solid rgba(255,255,255,.15);border-radius:50%}.rings i:nth-child(2){inset:60px}.rings i:nth-child(3){inset:120px}.rings b{position:absolute;inset:180px;display:grid;place-items:center;border-radius:50%;background:rgba(255,255,255,.12);backdrop-filter:blur(8px)}.rings span{font-size:44px}@keyframes spin{to{transform:rotate(360deg)}}
    @media(max-width:900px){.login-page{grid-template-columns:1fr}.login-visual{display:none}.login-panel{padding:104px 28px 48px}.login-copy{margin-top:54px}}@media(max-width:520px){.login-copy h1{font-size:2rem}.login-panel{padding-inline:20px}.form-meta{align-items:flex-start;gap:12px;flex-direction:column}}
  `]
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly showPassword = signal(false);
  readonly form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true); this.error.set(null);
    this.auth.login(this.form.getRawValue()).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: () => void this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl') ?? '/dashboard'),
      error: (error: HttpErrorResponse) => this.error.set(error.status === 401 ? 'E-mail ou mot de passe incorrect.' : 'Connexion impossible. Verifiez que l\'API est disponible.')
    });
  }
}
