import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwardsComponent } from './awards/awards.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [AwardsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class AwardsModule { }
