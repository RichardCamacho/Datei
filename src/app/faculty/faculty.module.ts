import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyComponent } from './faculty/faculty.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [FacultyComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ]
})
export class FacultyModule { }
