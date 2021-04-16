import { Injectable } from '@angular/core';
import { Ticket} from './ticket';
import { ticketsList } from './ticket-data';


@Injectable()
export class TicketService {


    public tickets: Ticket[] = ticketsList;

    public getTickets() {
        return this.tickets;
    }
}
