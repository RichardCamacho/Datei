import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutes } from './dashboard.routing';
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from "ng-apexcharts";

import { FacultiesComponent } from './dashboard-components/faculties/faculties.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FacultiesCurriculumComponent } from './dashboard-components/faculties-curriculum/faculties-curriculum.component';
import { SubjectsInfoComponent } from './dashboard-components/subjects-info/subjects-info.component';
import { TableModule } from 'primeng/table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { SoFoldersInfoComponent } from './dashboard-components/so-folders-info/so-folders-info.component';
import { FacultiesCurriculumChartComponent } from './dashboard-components/faculties-curriculum-chart/faculties-curriculum-chart.component';
import { FacultiesChartComponent } from './dashboard-components/faculties-chart/faculties-chart.component';
import {AccordionModule} from 'primeng/accordion';

@NgModule({
  imports: [
    FormsModule,
    TranslateModule,
    CommonModule, 
    NgbModule,
    TableModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    DropdownModule,
    NgSelectModule,
    ChartsModule, 
    ChartistModule, 
    NgApexchartsModule, 
    RouterModule.forChild(DashboardRoutes), 
    PerfectScrollbarModule,
    NgxSpinnerModule,
    AccordionModule
  ],
  declarations: [
    Dashboard1Component,
    FacultiesComponent,
    FacultiesCurriculumComponent,
    SubjectsInfoComponent,
    SoFoldersInfoComponent,
    FacultiesCurriculumChartComponent,
    FacultiesChartComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
