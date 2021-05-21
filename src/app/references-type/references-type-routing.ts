import { Routes } from '@angular/router';
import { ReferencesTypeListComponent } from './references-type-list/references-type-list.component';
import { ReferencesTypeComponent } from './references-type/references-type.component';

export const ReferencesTypeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: ReferencesTypeComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'ref_type.registrar_tipo_ref',
          urls: [{ title: 'ref_type.list_tipos_ref'}, { title: 'ref_type.registrar_tipo_ref' }]
        }
      },
      {
        path: 'list',
        component: ReferencesTypeListComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'ref_type.list_tipos_ref',
          urls: [{ title: 'main.inicio'}, { title: 'ref_type.list_tipos_ref' }]
        }
      },
      {
        path: ':id',
        component: ReferencesTypeComponent,
        data: {
          tabTitle: 'Datei - Universidad de Cartagena',
          title: 'ref_type.edit_tipo_ref',
          urls: [{ title: 'ref_type.list_tipos_ref'}, { title: 'ref_type.edit_tipo_ref' }]
        }
      }
    ]
  }
];