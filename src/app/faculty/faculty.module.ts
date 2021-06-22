import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyComponent } from './faculty/faculty.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [FacultyComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    DynamicDialogModule,
    TableModule,
    DropdownModule,
    NgSelectModule,
    ModalModule,
    TagModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, DialogService]
})
export class FacultyModule { }
