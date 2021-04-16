import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NoteService } from './note.service';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

    public showSidebar = false;

    notes = this.noteService.getNotes();
    selectedNote: Note = Object.create(null);
    searchText = '';
    clrName = 'warning';
    colors = [{ colorName: 'info' }, { colorName: 'warning' }, { colorName: 'danger' }, { colorName: 'success' }];

    constructor(public noteService: NoteService) {
    }

    mobileSidebar() {
        this.showSidebar = !this.showSidebar;
    }

    ngOnInit() {
        this.onLoad();
    }
    onLoad() {
        this.selectedNote = this.notes[0];
    }
    onSelect(note: Note) {
        this.selectedNote = note;
        this.clrName = this.selectedNote.color;
    }
    onSelectColor(colorName: string) {
        this.clrName = colorName;
        this.selectedNote.color = this.clrName;
    }
    removenote(note: Note) {
        const index: number = this.notes.indexOf(note);
        if (index !== -1) {
            this.notes.splice(index, 1);
            this.selectedNote = this.notes[0];
        }
    }
    addNoteClick() {
        this.notes.push({
            color: this.clrName,
            title: 'this is New notes',
            datef: new Date()
        });
    }
}
