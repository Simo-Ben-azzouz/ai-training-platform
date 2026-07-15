import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { API_BASE_URL } from '../core/config/api.config';
import { Formation } from '../models/formation.model';

@Injectable({ providedIn: 'root' })
export class FormationsService {
  private readonly http = inject(HttpClient);
  private readonly formationsState = signal<Formation[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  readonly formations = this.formationsState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  load(force = false): void {
    if ((!force && this.formationsState().length) || this.loadingState()) return;
    this.loadingState.set(true);
    this.errorState.set(null);
    this.http.get<Formation[]>(`${API_BASE_URL}/Formation/`).pipe(
      tap(items => this.formationsState.set(items)),
      catchError(() => {
        this.errorState.set('Impossible de charger le catalogue.');
        return of([]);
      }),
      finalize(() => this.loadingState.set(false))
    ).subscribe();
  }

  getById(id: string): Observable<Formation> {
    return this.http.get<Formation>(`${API_BASE_URL}/Formation/${id}`);
  }
}
