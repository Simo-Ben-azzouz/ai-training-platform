import { Routes } from '@angular/router';
export const SESSIONS_ROUTES:Routes=[{path:'',loadComponent:()=>import('./sessions').then(m=>m.Sessions)},{path:':id',loadComponent:()=>import('./session-details').then(m=>m.SessionDetails)}];
