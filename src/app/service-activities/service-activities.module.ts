
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceActivitiesComponent } from './service-activities/service-activities.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ServiceActivitiesComponent],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class ServiceActivitiesModule { }
