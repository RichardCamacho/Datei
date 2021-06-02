import { Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';


export const ChangePasswordRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'change-password',
            component: ChangePasswordComponent,
            data: {
              tabTitle: 'Datei - Universidad de Cartagena',
              title: 'users.c_contrasena',
              urls: [{ title: 'main.inicio'}, { title: 'users.c_contrasena' }]
            }
          }
    ]
  }
];