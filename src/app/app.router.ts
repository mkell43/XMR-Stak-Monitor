import { Route } from '@angular/router';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  { loadChildren: 'app/dashboard/dashboard.module#DashboardModule', path: 'dashboard' }
];
