import { Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesComponent } from './courses/courses.component';

export const CoursesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: CoursesComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'cursos.reg_inf_curso',
          urls: [{ title: 'cursos.list_cursos'}, { title: 'cursos.reg_inf_curso' }]
        }
      },
      {
        path: 'list',
        component: CoursesListComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'cursos.list_cursos',
          urls: [{ title: 'main.inicio'}, { title: 'cursos.list_cursos' }]
        }
      },
      {
        path: ':id',
        component: CoursesComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'cursos.edit_inf_curso',
          urls: [{ title: 'cursos.list_cursos'}, { title: 'ref_type.edit_tipo_ref' }]
        }
      }
    ]
  }
];