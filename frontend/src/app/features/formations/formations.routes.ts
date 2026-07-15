import { Routes } from '@angular/router';
export const FORMATIONS_ROUTES:Routes=[
  {path:'',loadComponent:()=>import('./formations').then(m=>m.Formations)},
  {path:':id',loadComponent:()=>import('./formation-details').then(m=>m.FormationDetails)}
];
