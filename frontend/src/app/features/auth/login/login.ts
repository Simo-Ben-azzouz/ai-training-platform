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
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <section class="login-page">
      <div class="login-panel">

        <a routerLink="/" class="back">
          <span class="material-symbols-rounded">arrow_back</span>
          Retour à l'accueil
        </a>

        <div class="login-copy">
          <p class="eyebrow">Espace apprenant</p>
          <h1>Ravi de vous revoir.</h1>
          <p>
            Connectez-vous pour retrouver vos formations et vos prochaines
            sessions.
          </p>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>

          <mat-form-field appearance="outline">
            <mat-label>Adresse e-mail</mat-label>

            <input
              matInput
              type="email"
              formControlName="email"
              autocomplete="email">

            <mat-icon matSuffix>mail</mat-icon>

            @if (form.controls.email.touched && form.controls.email.invalid) {
              <mat-error>Saisissez une adresse e-mail valide.</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Mot de passe</mat-label>

            <input
              matInput
              [type]="showPassword() ? 'text' : 'password'"
              formControlName="password"
              autocomplete="current-password">

            <button
              mat-icon-button
              matSuffix
              type="button"
              (click)="showPassword.set(!showPassword())">

              <mat-icon>
                {{ showPassword() ? 'visibility_off' : 'visibility' }}
              </mat-icon>

            </button>

            @if (form.controls.password.touched && form.controls.password.invalid) {
              <mat-error>Le mot de passe est requis.</mat-error>
            }
          </mat-form-field>

          <!-- Demo Account -->
          <div class="demo-box">
            <div class="demo-header">
              <mat-icon>info</mat-icon>
              <span>Compte de démonstration</span>
            </div>

            <div class="demo-row">
              <strong>Email :</strong>
              <code>demo&#64;forma.ma</code>
            </div>

            <div class="demo-row">
              <strong>Mot de passe :</strong>
              <code>Demo123!</code>
            </div>

            <button
              type="button"
              class="demo-btn"
              (click)="fillDemoAccount()">
              Utiliser ces identifiants
            </button>
          </div>

          <div class="form-meta">
            <label>
              <input type="checkbox">
              Rester connecté
            </label>

            <a href="mailto:support@forma.ma">
              Mot de passe oublié ?
            </a>
          </div>

          @if (error()) {
            <div class="error" role="alert">
              <span class="material-symbols-rounded">error</span>
              {{ error() }}
            </div>
          }

          <button
            mat-flat-button
            class="submit"
            type="submit"
            [disabled]="loading()">

            @if (loading()) {
              <span class="spinner"></span>
              Connexion...
            } @else {
              <span>Se connecter</span>
              <span class="material-symbols-rounded">arrow_forward</span>
            }

          </button>

        </form>

        <p class="support">
          Vous n'avez pas encore de compte ?
          <a href="mailto:support@forma.ma">
            Contacter votre administrateur
          </a>
        </p>

      </div>

      <aside class="login-visual" aria-hidden="true">

        <div class="quote">
          <span class="material-symbols-rounded">format_quote</span>

          <blockquote>
            La formation est l'essence de tout succès.
          </blockquote>

          <p>
            Une expérience pensée pour rester concentré sur l'essentiel.
          </p>
        </div>

        <div class="rings">
          <i></i>
          <i></i>
          <i></i>

          <b>
            <span class="material-symbols-rounded">
              school
            </span>
          </b>
        </div>

      </aside>

    </section>
  `,
  styles: [`
:host{
display:block;
min-height:100vh;
}

/* FIX INPUT COLORS IN DARK MODE */
/* Input text */
::ng-deep .mat-mdc-input-element{
    color: var(--ink) !important;
    caret-color: var(--brand) !important;
    -webkit-text-fill-color: var(--ink) !important;
}

/* Placeholder */
::ng-deep .mat-mdc-input-element::placeholder{
    color: var(--muted) !important;
}

/* Floating label */
::ng-deep .mdc-floating-label{
    color: var(--muted) !important;
}

/* Icons */
::ng-deep .mat-mdc-form-field-icon-suffix{
    color: var(--muted) !important;
}

/* Outline */
::ng-deep .mdc-notched-outline__leading,
::ng-deep .mdc-notched-outline__notch,
::ng-deep .mdc-notched-outline__trailing{
    border-color: var(--border) !important;
}

/* Focused outline */
::ng-deep .mat-focused .mdc-notched-outline__leading,
::ng-deep .mat-focused .mdc-notched-outline__notch,
::ng-deep .mat-focused .mdc-notched-outline__trailing{
    border-color: var(--brand) !important;
}

/* Label when focused */
::ng-deep .mat-focused .mdc-floating-label{
    color: var(--brand) !important;
}

::ng-deep .mdc-notched-outline__leading,
::ng-deep .mdc-notched-outline__notch,
::ng-deep .mdc-notched-outline__trailing{
border-color:#666 !important;
}

.login-page{
min-height:100vh;
display:grid;
grid-template-columns:minmax(480px,.88fr) minmax(480px,1.12fr);
background:var(--surface);
}

.login-panel{
width:min(100%,540px);
margin:auto;
padding:110px 48px 54px;
}

.back{
display:inline-flex;
align-items:center;
gap:7px;
color:var(--muted);
font-size:.8rem;
}

.back .material-symbols-rounded{
font-size:17px;
}

.login-copy{
margin:70px 0 34px;
}

.login-copy h1{
margin:0;
font-size:2.45rem;
}

.login-copy>p:last-child{
margin-top:14px;
color:var(--muted);
line-height:1.6;
}

form{
display:grid;
gap:6px;
}

mat-form-field{
width:100%;
}

/* DEMO ACCOUNT */

.demo-box{
margin:10px 0 18px;
padding:16px;
border-radius:10px;
background:#1f2937;
border:1px solid rgba(255,255,255,.08);
}

.demo-header{
display:flex;
align-items:center;
gap:8px;
font-weight:700;
margin-bottom:12px;
color:#fff;
}

.demo-row{
display:flex;
justify-content:space-between;
margin-bottom:8px;
font-size:.92rem;
color:#e6e6e6;
}

.demo-row code{
background:#111827;
padding:3px 8px;
border-radius:5px;
color:#7dd3fc;
font-family:monospace;
}

.demo-btn{
margin-top:10px;
width:100%;
padding:10px;
border:none;
border-radius:8px;
background:#2563eb;
color:#fff;
cursor:pointer;
font-weight:600;
transition:.2s;
}

.demo-btn:hover{
background:#1d4ed8;
}

.form-meta{
display:flex;
justify-content:space-between;
align-items:center;
margin:3px 0 18px;
font-size:.8rem;
color:var(--muted);
}

.form-meta a{
color:var(--brand-strong);
}

.error{
margin-bottom:12px;
padding:11px;
display:flex;
align-items:center;
gap:8px;
border-radius:6px;
background:#551b1b;
color:#ff9a9a;
}

.submit{
height:48px!important;
border-radius:8px!important;
background:var(--ink)!important;
color:white!important;
}

.spinner{
width:16px;
height:16px;
border:2px solid currentColor;
border-right-color:transparent;
border-radius:50%;
animation:spin .8s linear infinite;
}

.support{
margin-top:24px;
text-align:center;
color:var(--muted);
font-size:.82rem;
}

.login-visual{
position:relative;
overflow:hidden;
display:flex;
align-items:flex-end;
padding:64px;
background:#292b35;
color:white;
}

.login-visual:before{
content:'';
position:absolute;
inset:0;
background:linear-gradient(145deg,#292b35,#414477 56%,#177b70);
}

.quote{
position:relative;
z-index:2;
max-width:460px;
}

.quote blockquote{
font-size:3rem;
font-weight:600;
line-height:1.1;
margin:18px 0;
}

.quote p{
color:rgba(255,255,255,.7);
}

.rings{
position:absolute;
top:8%;
right:-5%;
width:440px;
height:440px;
}

.rings i{
position:absolute;
inset:0;
border:1px solid rgba(255,255,255,.15);
border-radius:50%;
}

.rings i:nth-child(2){
inset:60px;
}

.rings i:nth-child(3){
inset:120px;
}

.rings b{
position:absolute;
inset:180px;
display:grid;
place-items:center;
border-radius:50%;
background:rgba(255,255,255,.12);
}

@keyframes spin{
to{
transform:rotate(360deg);
}
}

@media(max-width:900px){
.login-page{
grid-template-columns:1fr;
}

.login-visual{
display:none;
}

.login-panel{
padding:80px 28px;
}
}
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
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  fillDemoAccount(): void {
    this.form.patchValue({
      email: 'demo@forma.ma',
      password: 'Demo123!'
    });
  }

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.auth.login(this.form.getRawValue())
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl(
            this.route.snapshot.queryParamMap.get('returnUrl') ?? '/dashboard'
          );
        },
        error: (error: HttpErrorResponse) => {
          this.error.set(
            error.status === 401
              ? 'E-mail ou mot de passe incorrect.'
              : 'Connexion impossible. Vérifiez que l’API est disponible.'
          );
        }
      });
  }

}