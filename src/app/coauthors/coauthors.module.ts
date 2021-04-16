import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoauthorsComponent } from './coauthors/coauthors.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [CoauthorsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class CoauthorsModule { }
