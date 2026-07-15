import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'forma.theme';
  readonly mode = signal<ThemeMode>(this.initialMode());

  constructor() {
    this.apply(this.mode());
  }

  toggle(): void {
    const next = this.mode() === 'light' ? 'dark' : 'light';
    this.mode.set(next);
    localStorage.setItem(this.storageKey, next);
    this.apply(next);
  }

  private initialMode(): ThemeMode {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'light' || saved === 'dark') return saved;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private apply(mode: ThemeMode): void {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }
}
