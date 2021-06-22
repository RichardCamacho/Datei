import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './_guards/auth.guard';

export const Approutes: Routes = [
	{
		path: '',
		component: BlankComponent,
		children: [
			{ path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
			{
				path: 'authentication',
				loadChildren:
					() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
			}
		]
	},
	{
		path: 'app',
		component: FullComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
		children: [
			{ path: '', redirectTo: '/dashboard/dashboard1', pathMatch: 'full' },//redirecciona coordinador
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule),
				data: {
					role: ['Coordinador']
				}
			},
			{ 	path: 'users',
				loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
				data: {
					role: ['Administrador']
				} 
			},
			{ 	path: 'references-type',
				loadChildren: () => import('./references-type/references-type.module').then(m => m.ReferencesTypeModule),
				data: {
					role: ['Administrador']
				} 
			},
			{ 	path: 'courses',
				loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
				data: {
					role: ['Coordinador']
				} 
			},
			{ 	path: 'curriculum-vitae',
				loadChildren: () => import('./curriculum-vitae/curriculum-vitae.module').then(m => m.CurriculumVitaeModule),
				data: {
					role: ['Coordinador', 'Docente', 'Lider de SO']
				} 
			},
			{ 	path: 'subject-folder',
				loadChildren: () => import('./subject-folders/subject-folders.module').then(m => m.SubjectFoldersModule),
				data: {
					role: ['Coordinador', 'Docente', 'Lider de SO']
				}  
			},
			{ 	path: 'section',
				loadChildren: () => import('./sections/sections.module').then(m => m.SectionsModule),
				data: {
					role: ['Coordinador', 'Docente', 'Lider de SO']
				}  
			},
			{ 	path: 'subject-information',
				loadChildren: () => import('./subject-information/subject-information.module').then(m => m.SubjectInformationModule),
				data: {
					role: ['Coordinador', 'Docente', 'Lider de SO']
				} 
			},
			{ 	path: 'so-folder',
				loadChildren: () => import('./so-folders/so-folders.module').then(m => m.SoFoldersModule),
				data: {
					role: ['Coordinador', 'Lider de SO']
				}  
			},
			{ 	path: 'folders',
				loadChildren: () => import('./folders/folders.module').then(m => m.FoldersModule),
				data: {
					role: ['Administrador']
				} 
			},
			{ 	path: 'minute',
				loadChildren: () => import('./minutes/minutes.module').then(m => m.MinutesModule),
				data: {
					role: ['Coordinador', 'Lider de SO']
				}  
			},
			{ 	path: 'continuous-improvement',
				loadChildren: () => import('./continuous-improvement/continuous-improvement.module').then(m => m.ContinuousImprovementModule),
				data: {
					role: ['Coordinador', 'Lider de SO']
				}  
			},
			{ 	path: 'configuration',
				loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule),
				data: {
					role: ['Coordinador', 'Docente', 'Administrador', 'Lider de SO']
				}  
			}
		]
	},
	{
		path: '**',
		redirectTo: '/authentication/404'
	}
];
