import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutes } from './dashboard.routing';
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from "ng-apexcharts";

import { IncomeCounterComponent } from './dashboard-components/income-counter/income-counter.component';
import { ProjectCounterComponent } from './dashboard-components/project-counter/project-counter.component';
import { ProjectComponent } from './dashboard-components/project/project.component';
import { RecentcommentComponent } from './dashboard-components/recent-comment/recent-comment.component';
import { RecentmessageComponent } from './dashboard-components/recent-message/recent-message.component';
import { SocialSliderComponent } from './dashboard-components/social-slider/social-slider.component';
import { TodoComponent } from './dashboard-components/to-do/todo.component';
import { ProfileComponent } from './dashboard-components/profile/profile.component';
import { PageAnalyzerComponent } from './dashboard-components/page-analyzer/pa.component';
import { WidgetComponent } from './dashboard-components/widget/widget.component';
import { CustomerSupportComponent } from './dashboard-components/customer-support/cs.component';
import { TotalEarningComponent } from './dashboard-components/total-earnings/te.component';
import { FeedsComponent } from './dashboard-components/feeds/feeds.component';
import { EarningComponent } from './dashboard-components/earning-report/earning-report.component';
import { ActivityComponent } from './dashboard-components/activity-timeline/activity.component';
import { MonthlyIncomeComponent } from './dashboard-components/monthly-income/monthly-income.component';
import { VisitSeparationComponent } from './dashboard-components/visit-separation/visit-separation.component';
import { WebsiteVisitComponent } from './dashboard-components/website-visit/website-visit.component';
import { SalesOverviewComponent } from './dashboard-components/sales-overview/sales-overview.component';
import { TotalSalesComponent } from './dashboard-components/total-sales/total-sales.component';
import { SalesEarningComponent } from './dashboard-components/sales-earning/sales-earning.component';
import { FacultiesComponent } from './dashboard-components/faculties/faculties.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FacultiesCurriculumComponent } from './dashboard-components/faculties-curriculum/faculties-curriculum.component';
import { SubjectsInfoComponent } from './dashboard-components/subjects-info/subjects-info.component';
import { TableModule } from 'primeng/table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';

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
    NgxSpinnerModule
  ],
  declarations: [
    Dashboard1Component,
    Dashboard2Component,
    Dashboard3Component,
    IncomeCounterComponent,
    ProjectCounterComponent,
    ProjectComponent,
    RecentcommentComponent,
    RecentmessageComponent,
    SocialSliderComponent,
    TodoComponent,
    ProfileComponent,
    PageAnalyzerComponent,
    WidgetComponent,
    CustomerSupportComponent,
    TotalEarningComponent,
    FeedsComponent,
    EarningComponent,
    ActivityComponent,
    MonthlyIncomeComponent,
    VisitSeparationComponent,
    WebsiteVisitComponent,
    SalesOverviewComponent,
    TotalSalesComponent,
    SalesEarningComponent,
    FacultiesComponent,
    FacultiesCurriculumComponent,
    SubjectsInfoComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
