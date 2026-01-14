import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () =>
          import('./features/clientes/clientes.routes')
            .then(m => m.CLIENTES_ROUTES)
      },
      {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full'
      }
    ]
  }
];