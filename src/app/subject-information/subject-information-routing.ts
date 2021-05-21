import { Routes } from '@angular/router';
import { SubjectInformationListComponent } from './subject-information-list/subject-information-list.component';
import { SubjectInformationComponent } from './subject-information/subject-information.component';

export const SubjectInformationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: SubjectInformationComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'cursos.reg_inf_curso',
          urls: [{ title: 'cursos.list_cursos'}, { title: 'cursos.reg_inf_curso' }]//redireccionar a list
        }
      },
      {
        path: 'list',
        component: SubjectInformationListComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'cursos.list_cursos',
          urls: [{ title: 'main.inicio'}, { title: 'cursos.list_cursos' }]//redireccionar al home
        }
      },
      {
        path: ':id',
        component: SubjectInformationComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'cursos.edit_inf_curso',
          urls: [{ title: 'cursos.list_cursos'}, { title: 'cursos.edit_inf_curso' }]//redireccionar a list
        }
      }
    ]
  }
];