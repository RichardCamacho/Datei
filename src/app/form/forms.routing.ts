import { Routes } from '@angular/router';

import { NgbdtypeheadBasicComponent } from './typehead/typehead.component';

export const FormsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'formsa/typehead',
        component: NgbdtypeheadBasicComponent,
        data: {
          title: 'Typehead',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Typehead' }
          ]
        }
      },
      {
        path: 'ngx',
        loadChildren: () => import('./ngx-wizard/ngx-wizard.module').then(m => m.NGXFormWizardModule)
      }
    ]
  }
];
