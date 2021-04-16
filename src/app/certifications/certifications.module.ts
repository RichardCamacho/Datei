import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificationsComponent } from './certifications/certifications.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [CertificationsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class CertificationsModule { }
