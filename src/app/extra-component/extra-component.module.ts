import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';

import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ExtraComponentsRoutes } from './extra-component.routing';
import { ToastrComponent } from './toastr/toastr.component';

import { EditorComponent } from './editor/editor.component';
import { DragComponent } from './drag-n-drop/drag.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ExtraComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    NgbModule,
    FileUploadModule,
    DragDropModule
  ],
  declarations: [
    ToastrComponent,
    EditorComponent,
    DragComponent
  ]


})
export class ExtraComponentModule {}
