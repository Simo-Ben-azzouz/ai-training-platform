import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { API_BASE_URL } from '../core/config/api.config';
import { TrainingSession } from '../models/session.model';

@Injectable({ providedIn: 'root' })
export class SessionsService {
  private readonly http = inject(HttpClient);
  private readonly enrollmentKey = 'forma.my-sessions';
  private readonly sessionsState = signal<TrainingSession[]>([]);
  private readonly enrolledIds = signal<string[]>(this.readEnrollments());
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  readonly sessions = this.sessionsState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();
  readonly mySessions = computed(() => {
    const ids = new Set(this.enrolledIds());
    return this.sessionsState().filter(session => ids.has(session.id));
  });

  load(force = false): void {
    if ((!force && this.sessionsState().length) || this.loadingState()) return;
    this.loadingState.set(true);
    this.errorState.set(null);
    this.http.get<TrainingSession[]>(`${API_BASE_URL}/Session/`).pipe(
      tap(items => this.sessionsState.set(items)),
      catchError(() => {
        this.errorState.set('Impossible de charger les sessions.');
        return of([]);
      }),
      finalize(() => this.loadingState.set(false))
    ).subscribe();
  }

  getById(id: string): Observable<TrainingSession> {
    return this.http.get<TrainingSession>(`${API_BASE_URL}/Session/${id}`);
  }

  isEnrolled(id: string): boolean {
    return this.enrolledIds().includes(id);
  }

  join(id: string): void {
    if (this.isEnrolled(id)) return;
    const next = [...this.enrolledIds(), id];
    this.enrolledIds.set(next);
    localStorage.setItem(this.enrollmentKey, JSON.stringify(next));
  }

  leave(id: string): void {
    const next = this.enrolledIds().filter(value => value !== id);
    this.enrolledIds.set(next);
    localStorage.setItem(this.enrollmentKey, JSON.stringify(next));
  }

  private readEnrollments(): string[] {
    try {
      return JSON.parse(localStorage.getItem(this.enrollmentKey) ?? '[]') as string[];
    } catch {
      return [];
    }
  }
}
