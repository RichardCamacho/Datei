import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalActivitiesComponent } from './professional-activities/professional-activities.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [ProfessionalActivitiesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class ProfessionalActivitiesModule { }
