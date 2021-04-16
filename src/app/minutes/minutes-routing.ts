import { Routes } from '@angular/router';
import { MinutesComponent } from './minutes/minutes.component';

export const MinutesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        children: [
            {
                path: ':idF',
                component: MinutesComponent,
                data: {
                tabTitle: 'Datei - Universidad de Cartagena',
                title: 'carpeta_so.reg_acta_so'
                }
            }
        ]
      },
      {
        path: ':id',
        component: MinutesComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'carpeta_so.edit_acta_so',
          urls: [{ title: 'carpeta_so.carp_so', url: '/app/so-folder/list' }, { title: 'carpeta_so.edit_acta_so' }]
        }
      }
    ]
  }
];