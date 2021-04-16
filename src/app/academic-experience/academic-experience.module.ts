import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicExperienceComponent } from './academic-experience/academic-experience.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [AcademicExperienceComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class AcademicExperienceModule { }
