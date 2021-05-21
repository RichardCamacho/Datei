import { Routes } from '@angular/router';
import { ContinuousImprovementComponent } from './continuous-improvement/continuous-improvement.component';

export const ContinuousImprovementRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        children: [
            {
                path: ':idF',
                component: ContinuousImprovementComponent,
                data: {
                tabTitle: 'Datei - Universidad de Cartagena',
                title: 'carpeta_so.registrar_acta_mej'
                }
            }
        ]
      },
      {
        path: ':id',
        component: ContinuousImprovementComponent,
        data: {          
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'carpeta_so.edit_acta_mej',
          urls: [{ title: 'carpeta_so.carp_so'}, { title: 'carpeta_so.edit_acta_mej' }]
        }
      }
    ]
  }
];