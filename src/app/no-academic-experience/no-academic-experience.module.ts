import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoAcademicExperienceComponent } from './no-academic-experience/no-academic-experience.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [NoAcademicExperienceComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class NoAcademicExperienceModule { }
