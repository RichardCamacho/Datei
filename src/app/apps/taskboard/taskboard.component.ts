import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent {
 todos = [
  {
    title: 'QA Testing',
    desc: 'Etiam porta sem malesuada magna mollis euismod.',
    class: '',
  },
  {
    title: 'Layout design',
    desc:
      'Sed posuere consectetur est at lobortis. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
    class: 'task-status-danger',
  },
  {
    title: 'Fix navigation menu',
    desc: 'Donec sed odio dui.',
    class: 'task-status-info',
  },
  {
    title: 'Update bootstrap 4',
    desc: 'Aenean lacinia bibendum nulla sed consectetur.',
    class: '',
  },
  {
    title: 'Run build tools',
    desc:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
    class: '',
  },
  {
    title: 'List article ideas',
    desc:
      'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.',
    class: 'task-status-success',
  },
  {
    title: 'Reactjs fixes',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    class: '',
  },
  {
    title: 'Implement SSL',
    desc: 'Etiam porta sem malesuada magna mollis euismod.',
    class: 'task-status-warning',
  },
];

 process = [
  {
    title: 'QOS Assessment',
    desc: 'Maecenas sed diam eget risus varius blandit sit amet non magna.',
    class: '',
  },
  {
    title: 'Schedule new tasks',
    desc: 'Sed posuere consectetur est at lobortis.',
    class: 'task-status-warning',
  },
  {
    title: 'Add dashboard variants',
    desc: 'Nulla vitae elit libero, a pharetra augue.',
    class: '',
  },
  {
    title: 'Extended color scheme support',
    desc: 'Morbi leo risus, porta ac consectetur ac, vestibulum ateros.',
    class: '',
  },
  {
    title: 'Merge unit tests',
    desc: 'Maecenas sed diam eget risus varius blandit sit amet non magna.',
    class: 'task-status-info',
  },
  {
    title: 'Test final version',
    desc:
      'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.',
    class: '',
  },
];

 pendings = [
  {
    title: 'Integrate Angular 4',
    desc: 'Nulla vitae elit libero, a pharetra augue.',
    class: '',
  },
  {
    title: 'Additional fields',
    desc: 'Donec id elit non mi porta gravida at eget metus.',
    class: '',
  },
  {
    title: 'Draggable task board',
    desc: 'Sed posuere consectetur est at lobortis.',
    class: 'task-status-danger',
  },
  {
    title: 'Setup CI server',
    desc: 'Maecenas faucibus mollis interdum.',
    class: 'task-status-danger',
  },
  {
    title: 'Assign new tasks',
    desc: 'Nullam quis risus eget urna mollis ornare vel eu leo.',
    class: '',
  },
  {
    title: 'Contact administrator',
    desc:
      'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
    class: '',
  },
  {
    title: 'Commit changes',
    desc: 'Aenean lacinia bibendum nulla sed consectetur.',
    class: '',
  },
];

 done = [
  {
    title: 'Store new files',
    desc: 'Sed posuere consectetur est at lobortis.',
    class: 'task-status-info',
  },
  {
    title: 'Build landing page',
    desc: 'Maecenas sed diam eget risus varius blandit sit amet non magna.',
    class: '',
  },
  {
    title: 'Setup basic layout',
    desc: 'Vestibulum id ligula porta felis euismod semper.',
    class: '',
  },
  {
    title: 'Graphical fixes',
    desc: 'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
    class: '',
  },
  {
    title: 'Email alerts',
    desc: 'Donec sed odio dui.',
    class: 'task-status-warning',
  },
];

drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
