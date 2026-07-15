import { Routes } from '@angular/router';
export const MY_SESSIONS_ROUTES:Routes=[{path:'',loadComponent:()=>import('./my-sessions').then(m=>m.MySessions)}];
