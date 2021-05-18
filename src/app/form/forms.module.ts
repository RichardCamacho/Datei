import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsRoutes } from './forms.routing';
import { NGXFormWizardModule } from "./ngx-wizard/ngx-wizard.module";

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgbdtypeheadBasicComponent } from './typehead/typehead.component';

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(FormsRoutes),
    FormsModule,
    NGXFormWizardModule,
    CustomFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    ReactiveFormsModule],
  declarations: [
    NgbdtypeheadBasicComponent
  ]
})
export class FormModule { }
