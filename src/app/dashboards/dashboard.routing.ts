import { Routes } from '@angular/router';

import { Dashboard1Component } from './dashboard1/dashboard1.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard1',
        component: Dashboard1Component,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'Modern Dashboard',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Modern Dashboard' }]
        }
      }
    ]
  }
];
