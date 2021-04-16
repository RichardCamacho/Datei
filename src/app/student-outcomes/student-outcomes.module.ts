import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StudentOutcomesComponent } from './student-outcomes/student-outcomes.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [StudentOutcomesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class StudentOutcomesModule { }
