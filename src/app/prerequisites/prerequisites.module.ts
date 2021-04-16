import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrerequisitesComponent } from './prerequisites/prerequisites.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [PrerequisitesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class PrerequisitesModule { }
