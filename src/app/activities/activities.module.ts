import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities/activities.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule,
    CalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ActivitiesModule { }
