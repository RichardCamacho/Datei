import { Routes } from '@angular/router';
import { CurriculumVitaeComponent } from './curriculum-vitae/curriculum-vitae.component';

export const CurriculumVitaeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: CurriculumVitaeComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'curriculum.reg_hoja_vida',
          urls: [{ title: 'main.inicio'}, { title: 'curriculum.reg_hoja_vida' }]
        }
      },
      {
        path: ':id',
        component: CurriculumVitaeComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'curriculum.edit_hoja_vida',
          urls: [{ title: 'main.inicio'}, { title: 'curriculum.edit_hoja_vida' }]
        }
      }
    ]
  }
];