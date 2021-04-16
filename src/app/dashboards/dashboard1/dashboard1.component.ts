import { Component, AfterViewInit, ViewChild } from '@angular/core';

@Component({
	templateUrl: './dashboard1.component.html',
	styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements AfterViewInit {

	subtitle: string;
	constructor() {
		this.subtitle = 'This is some text within a card block.';
	}

	ngAfterViewInit() { 

	}
}
