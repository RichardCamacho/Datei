import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoversComponent } from './covers/covers.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SubjectInformationRoutes } from '../subject-information/subject-information-routing';



@NgModule({
  declarations: [
    CoversComponent,
    FileUploadModule,
    HttpClientModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SubjectInformationRoutes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CoversModule { }
