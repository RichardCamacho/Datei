import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-compose',
    templateUrl: './compose.component.html',
    styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

    content: NgbModal = Object.create(null);

    constructor(public modal: NgbModal) {


    }

    ngOnInit(): void {

        this.openModal(this.content);
    }

    openModal(content: NgbModal) {

        this.modal.open(content, { size: 'lg' });
    }

    closeModal() {
        this.modal.dismissAll();
    }

}
