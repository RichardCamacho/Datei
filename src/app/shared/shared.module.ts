import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { DialogLookupComponent } from './dialog-lookup/dialog-lookup.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    FileUploadComponent,
    DialogLookupComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FileUploadModule,
    HttpClientModule,
    DynamicDialogModule,
    TableModule
  ],
  exports: [
    FileUploadComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule { }
