import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { API_BASE_URL } from '../core/config/api.config';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly http = inject(HttpClient);
  private readonly categoriesState = signal<Category[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  readonly categories = this.categoriesState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  load(force = false): void {
    if ((!force && this.categoriesState().length) || this.loadingState()) return;
    this.loadingState.set(true);
    this.errorState.set(null);
    this.http.get<Category[]>(`${API_BASE_URL}/Category/`).pipe(
      tap(items => this.categoriesState.set(items)),
      catchError(() => {
        this.errorState.set('Impossible de charger les categories pour le moment.');
        return of([]);
      }),
      finalize(() => this.loadingState.set(false))
    ).subscribe();
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${API_BASE_URL}/Category/${id}`);
  }
}
