import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumVitaeComponent } from './curriculum-vitae/curriculum-vitae.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NGXFormWizardModule } from '../form/ngx-wizard/ngx-wizard.module';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationService } from 'primeng/api';
import { CurriculumVitaeRoutes } from "./curriculum-viate-routing";
import { SchoolingComponent } from '../schooling/schooling/schooling.component';
import { AcademicExperienceComponent } from '../academic-experience/academic-experience/academic-experience.component';
import { NoAcademicExperienceComponent } from '../no-academic-experience/no-academic-experience/no-academic-experience.component';
import { OrganizationsComponent } from '../organizations/organizations/organizations.component';
import { ProfessionalActivitiesComponent } from '../professional-activities/professional-activities/professional-activities.component';
import { CertificationsComponent } from '../certifications/certifications/certifications.component';
import { PublicationsComponent } from '../publications/publications/publications.component';
import { CoauthorsComponent } from '../coauthors/coauthors/coauthors.component';
import { AwardsComponent } from '../awards/awards/awards.component';
import { ServiceActivitiesComponent } from '../service-activities/service-activities/service-activities.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    CurriculumVitaeComponent,
    SchoolingComponent,
    AcademicExperienceComponent,
    NoAcademicExperienceComponent,
    OrganizationsComponent,
    ProfessionalActivitiesComponent,
    CertificationsComponent,
    PublicationsComponent,
    CoauthorsComponent,
    AwardsComponent,
    ServiceActivitiesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(CurriculumVitaeRoutes),
    NGXFormWizardModule,
    CustomFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    NgSelectModule,
    ModalModule,
    NgbAccordionModule,
    TranslateModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService]
})
export class CurriculumVitaeModule { }
