import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHelp {

     get today() { return  new Date();}
     get month() { return  this.today.getMonth();}
     get year() { return  this.today.getFullYear();}
     get nextMonth() { return (this.month === 11) ? 0 : this.month + 1; }
     get nextYear() { return (this.nextMonth === 0) ? this.year + 1 : this.year; }

     get maxDateToday(): Date {
        const tmpDate = new Date();
        return tmpDate;
     }

     get maxDateNextMonth(): Date {
        const tmpDate = new Date();
        tmpDate.setMonth(this.nextMonth);
        tmpDate.setFullYear(this.nextYear);
        return tmpDate;
     }
     // configuracion localizcion
     en = {
      firstDayOfWeek: 0,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
      monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
      monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'yy-mm-dd',
      weekHeader: 'Wk'
      };

      es = {
         firstDayOfWeek: 1,
         dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
         dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
         dayNamesMin: [ "D","L","M","X","J","V","S" ],
         monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
         monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
         today: 'Hoy',
         clear: 'Borrar',
         dateFormat: 'yy-mm-dd',
         weekHeader: 'Sem'
     }
}
