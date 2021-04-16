import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks-service.service';
import { TaskSection } from './tasks';

import { moveItemInArray } from '@angular/cdk/drag-drop';

import { CustomAdapter, CustomDateParserFormatter } from './date.service';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css'],
    providers: [
        { provide: NgbDateAdapter, useClass: CustomAdapter },
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
    ]
})
export class TasksComponent implements OnInit {

    sectionTask: TaskSection[] | null = null;
    selectedST: TaskSection | undefined = Object.create(null);

    count = 0;
    totalcount = 0;
    completedcount = 0;
    titleTaskSection = '';
    borderClass = false;

    constructor(public ts: TasksService) {



        this.sectionTask = ts.getSectionWiseTask();
        this.remainingTasks();

        this.totalcount = this.sectionTask.filter(st => st.sectionTaskType === 'task').length;

        this.completedcount = this.sectionTask.filter(st => st.sectionTaskType === 'task' && st.status).length;
    }

    ngOnInit(): void {

    }

    addTaskSection(funtion: string) {

        if ((document.getElementById('rightMenu')as HTMLFormElement).style.width === '300px') {
            this.closeRightMenu();
            return;
        }
        (document.getElementById('rightMenu')as HTMLFormElement).style.width = '300px';

        if (funtion === 'task') {
            this.titleTaskSection = 'Task';

            const task = new TaskSection();
            task.status = false;
            task.sectionTaskType = 'task';
            task.title = 'Task';
            task.priority = 'normal';


            this.sectionTask?.splice(0, 0, task);
            this.sectionTask?.push(task);
            this.selectedST = this.sectionTask?.find(tk => tk === task);

        } else {
            this.titleTaskSection = 'Section';

            const section: TaskSection = new TaskSection();
            section.status = false;
            section.sectionTaskType = 'section';
            section.title = 'Section';
            section.priority = 'normal';

            this.sectionTask?.splice(0, 0, section);
            this.sectionTask?.push(section);
            this.selectedST = this.sectionTask?.find(sec => sec === section);
        }

        this.remainingTasks();

    }

    sectionTaskSelected(selected: TaskSection) {

        if ((document.getElementById('rightMenu')as HTMLFormElement).style.width === '300px') {
            this.closeRightMenu();
            return;
        }
        (document.getElementById('rightMenu')as HTMLFormElement).style.width = '300px';



        if (selected.sectionTaskType === 'section') {
            this.titleTaskSection = 'Section';
        } else {
            this.titleTaskSection = 'Task';
        }

        this.selectedST = selected;
        this.selectedST.border = true;
    }




    closeRightMenu() {

        (document.getElementById('rightMenu')as HTMLFormElement).style.width = '0';
        if (this.selectedST !== undefined) {
            this.selectedST.border = false;
        }
        this.selectedST = undefined;
    }


    remainingTasks() {

        this.count = 0;
        if (this.sectionTask) {
            for (const st of this.sectionTask) {

                if (st.sectionTaskType === 'task') {
                    if (!st.status) {
                        this.count++;
                    }
                }

            }
        }
    }


    checkboxValue($event: any, st: TaskSection) {

        st.status = $event.currentTarget.checked;
        this.remainingTasks();
    }

    deleteClick(object: TaskSection) {

        if (this.sectionTask !== null) {
            this.sectionTask = this.sectionTask.filter(tks => tks !== object);
        }
        this.remainingTasks();
        this.closeRightMenu();

    }


    drop(event: any) {
        if (this.sectionTask !== null) {
            moveItemInArray(this.sectionTask, event.previousIndex, event.currentIndex);
        }
    }



}
