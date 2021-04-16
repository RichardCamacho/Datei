import { Routes } from '@angular/router';
import { RegisterUsersComponent } from './register-users/register-users.component';
import { UsersListComponent } from './users-list/users-list.component';

export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: RegisterUsersComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'users.registrar_usuario',
          urls: [{ title: 'users.list_usuarios', url: '/app/users/list' }, { title: 'users.registrar_usuario' }]
                }
      },
      {
        path: 'list',
        component: UsersListComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'users.list_usuarios',
          urls: [{ title: 'main.inicio', url: '/app/dashboard/dashboard1' }, { title: 'users.list_usuarios' }]
        }
      },
      {
        path: ':id',
        component: RegisterUsersComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'users.edit_usuario',
          urls: [{ title: 'users.list_usuarios', url: '/app/users/list' }, { title: 'users.edit_usuario' }]
                }
      }
    ]
  }
];
