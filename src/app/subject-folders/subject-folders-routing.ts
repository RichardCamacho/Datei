import { Routes } from '@angular/router';
import { SubjectFoldersListComponent } from './subject-folders-list/subject-folders-list.component';
import { SubjectFoldersComponent } from './subject-folders/subject-folders.component';

export const SubjectFolderRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: SubjectFoldersComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'carpeta_asig.reg_carp_asig',
          urls: [{ title: 'carpeta_asig.list_carpetas', url: '/app/subject-folder/list' }, { title: 'carpeta_asig.reg_carp_asig' }]//redireccionar a list
        }
      },
      {
        path: 'list',
        component: SubjectFoldersListComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'carpeta_asig.list_carpetas',
          urls: [{ title: 'main.inicio', url: '/app/dashboard/dashboard1' }, { title: 'carpeta_asig.list_carpetas' }]//redireccionar al home
        }
      },
      {
        path: ':id',
        component: SubjectFoldersComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'carpeta_asig.edit_carp_asig',
          urls: [{ title: 'carpeta_asig.list_carpetas', url: '/app/subject-folder/list' }, { title: 'carpeta_asig.edit_carp_asig' }]//redireccionar a list
        }
      }
    ]
  }
];