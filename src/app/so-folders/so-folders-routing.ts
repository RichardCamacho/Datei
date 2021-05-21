import { Routes } from '@angular/router';
import { SoFoldersListComponent } from './so-folders-list/so-folders-list.component';
import { SoFoldersComponent } from './so-folders/so-folders.component';

export const SoFolderRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: SoFoldersComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'carpeta_so.reg_carp_so',
          urls: [{ title: 'carpeta_asig.list_carpetas'}, { title: 'carpeta_so.reg_carp_so' }]//redireccionar a list
        }
      },
      {
        path: 'list',
        component: SoFoldersListComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'carpeta_asig.list_carpetas',
          urls: [{ title: 'main.inicio'}, { title: 'carpeta_asig.list_carpetas' }]//redireccionar al home
        }
      },
      {
        path: ':id',
        component: SoFoldersComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'carpeta_so.edit_carp_so',
          urls: [{ title: 'carpeta_asig.list_carpetas'}, { title: 'carpeta_so.edit_carp_so' }]//redireccionar a list
        }
      }
    ]
  }
];