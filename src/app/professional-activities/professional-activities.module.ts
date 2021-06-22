import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalActivitiesComponent } from './professional-activities/professional-activities.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ProfessionalActivitiesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule,
    CalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ProfessionalActivitiesModule { }
