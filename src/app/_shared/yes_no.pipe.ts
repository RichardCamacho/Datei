import {Pipe, PipeTransform} from '@angular/core';

//una pipe para mostrar si o no 
@Pipe({name: 'yes_no'})
export class Yes_NoPipe implements PipeTransform {
    transform(value) {
        return value ? 'Si' : 'No';
    }
}