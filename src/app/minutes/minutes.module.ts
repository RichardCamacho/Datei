import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinutesComponent } from './minutes/minutes.component';
import { AttendantsComponent } from '../attendants/attendants/attendants.component';
import { ActivitiesComponent } from '../activities/activities/activities.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NGXFormWizardModule } from '../form/ngx-wizard/ngx-wizard.module';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationService } from 'primeng/api';
import { MinutesRoutes } from "./minutes-routing";
import { Yes_NoPipe } from '../_shared/yes_no.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { SignaturesComponent } from '../signatures/signatures/signatures.component';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    MinutesComponent,
    AttendantsComponent,
    ActivitiesComponent,
    SignaturesComponent,
    Yes_NoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MinutesRoutes),
    NGXFormWizardModule,
    CustomFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    NgSelectModule,
    ModalModule,
    TranslateModule,
    NgxSpinnerModule,
    CalendarModule,
    AccordionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService]
})
export class MinutesModule { }
