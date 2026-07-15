import { Routes } from '@angular/router';
export const ANAM_ROUTES:Routes=[{path:'',loadComponent:()=>import('./anam').then(m=>m.AnamTrainer)},{path:':sessionId',loadComponent:()=>import('./anam').then(m=>m.AnamTrainer)}];
