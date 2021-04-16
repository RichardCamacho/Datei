import { Routes } from '@angular/router';
import { FoldersListComponent } from './folders-list/folders-list.component';

export const FoldersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: FoldersListComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'carpetas.list_carpetas',
          urls: [{ title: 'main.inicio', url: '/app/dashboard/dashboard1' }, { title: 'carpetas.list_carpetas' }]
        }
      }
    ]
  }
];