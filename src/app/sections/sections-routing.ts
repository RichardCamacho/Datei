import { Routes } from '@angular/router';
import { SectionsComponent } from './sections/sections.component';

export const SectionsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        children: [
            {
                path: ':idS',
                component: SectionsComponent,
                data: {
                tabTitle: 'Datei - Universidad de Cartagena',
                title: 'carpeta_asig.secciones'
                }
            }
        ]
      }
    ]
  }
];