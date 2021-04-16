import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
} from '@angular/cdk/drag-drop';

@Component({
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.scss'],
})
export class DragComponent {
  movies = [
    'Order the server hardware for production as well as test/quality assurance (QA).',
    'Install Tivoli Business Systems Manager and appropriate patches on test or QA servers.',
    'Create configuration level objects for the test LPAR.',
    'Install Tivoli Business Systems Manager and appropriate maintenance on the test LPAR.',
    'Install event enablement on the Tivoli Enterprise Console server.',
    'Install event enablement on the Tivoli Enterprise Console server.',
    'Configure servers, Source/390 on the production LPARs, event enablement on the Tivoli Enterprise Console server, and verify connectivity.',
    'Monitor system performance and adjust hardware as required.',
  ];

  // orientation
  horizontalOrientation = [
    'React',
    'Angular',
    'Vuejs',
    'Bootstrap',
    'Laravel',
    'Shopify',
    'Wordpress',
    'Jquery',
    'Ant.js',
    'Reactstrap',
    'Vuetify',
  ];

  // Transfer Items Between Lists
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail'];

  // ood even number
  all = [1, 3, 5, 6, 7, 8, 9];
  even = [10, 2, 4];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  orientationDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.horizontalOrientation,
      event.previousIndex,
      event.currentIndex
    );
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  oddevenDrop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
}
