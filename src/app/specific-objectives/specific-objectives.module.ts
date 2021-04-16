import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecificObjectivesComponent } from './specific-objectives/specific-objectives.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [SpecificObjectivesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class SpecificObjetivesModule { }
