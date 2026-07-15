import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { AuthTokens, CurrentUser, LoginRequest } from '../../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenKey = 'forma.access-token';
  private readonly refreshTokenKey = 'forma.refresh-token';
  private readonly accessToken = signal<string | null>(localStorage.getItem(this.tokenKey));

  readonly currentUser = computed(() => this.readUser(this.accessToken()));
  // ASP.NET Identity's built-in bearer tokens are opaque, not necessarily JWTs.
  // A token that cannot be decoded client-side is still valid for API requests.
  readonly isAuthenticated = computed(() => !!this.accessToken());

  login(request: LoginRequest): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${API_BASE_URL}/identity/login?useCookies=false`, request).pipe(
      tap(tokens => this.storeTokens(tokens))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.accessToken.set(null);
  }

  token(): string | null {
    return this.accessToken();
  }

  private storeTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.tokenKey, tokens.accessToken);
    localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
    this.accessToken.set(tokens.accessToken);
  }

  private readUser(token: string | null): CurrentUser | null {
    if (!token) return null;
    try {
      const segment = token.split('.')[1];
      if (!segment) return null;
      const payload = JSON.parse(atob(segment.replace(/-/g, '+').replace(/_/g, '/'))) as Record<string, unknown>;
      const exp = Number(payload['exp'] ?? 0);
      if (exp && exp * 1000 < Date.now()) return null;
      const email = String(payload['email'] ?? payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ?? 'apprenant@forma.ma');
      const id = String(payload['sub'] ?? payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ?? '');
      const rawName = String(payload['name'] ?? email.split('@')[0]);
      const name = rawName.split(/[._-]/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
      const initials = name.split(' ').slice(0, 2).map(part => part.charAt(0)).join('').toUpperCase();
      return { id, email, name, initials };
    } catch {
      return null;
    }
  }
}
