import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendantsComponent } from './attendants/attendants.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [AttendantsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class AttendantsModule { }
