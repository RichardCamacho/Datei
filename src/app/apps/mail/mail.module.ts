

import { MailboxComponent } from './mailbox.component';
import { ListingComponent } from './listing/listing.component';
import { DetailComponent } from './detail/detail.component';
import { ComposeComponent } from './compose/compose.component';

export const routes = [
    {
        path: '',
        component: MailboxComponent,
        children: [
            { path: '', redirectTo: 'apps/mail/inbox', pathMatch: 'full' },
            { path: ':type', component: ListingComponent },
            { path: 'compose', component: ComposeComponent },
            { path: ':type/:id', component: DetailComponent }
        ]
    }
];


