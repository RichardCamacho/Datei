import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, AlignCenter, AlignJustify, AlignLeft, AlignRight, Anchor, Aperture, Archive, ArrowDown, ArrowDownCircle, ArrowDownLeft, ArrowDownRight, ArrowLeftCircle, ArrowLeft, ArrowRight, ArrowRightCircle, ArrowUp, ArrowUpCircle, ArrowUpLeft, ArrowUpRight, AtSign, Award, BarChart2, BarChart, BatteryCharging, Battery, BellOff, Bell, Bluetooth, Bold, BookOpen, Book, Bookmark, Box, Briefcase, Calendar, CameraOff, Cast, CheckCircle, CheckSquare, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, Chrome, Circle, Clipboard, Clock, CloudDrizzle, CloudLightning, CloudOff, CloudRain, Cloud, CloudSnow, Code, Codepen, Codesandbox, Coffee, Columns, Command, Compass, Copy, CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, Cpu, CreditCard, Crop, Crosshair, Database, Delete, Disc, DollarSign, DownloadCloud, Download, Droplet, Edit, Edit2, Edit3, ExternalLink, EyeOff, Eye, Facebook, FastForward, Feather, Figma, FileMinus, FilePlus, FileText, File, Film, Filter, Flag, Folder, FolderMinus, FolderPlus, Framer, Frown, Gift, GitBranch, GitCommit, GitMerge, GitPullRequest, Gitlab, Globe, Grid, HardDrive, Hash, Headphones, HelpCircle, Hexagon, Home, MoreHorizontal, Image, Inbox, Info, Instagram, Italic, Key, Layers, Layout, LifeBuoy, Link, Link2, Linkedin, List, Loader, Lock, LogIn, LogOut, Mail, MapPin, Map, Maximize, Maximize2, Meh, Menu, MessageCircle, MessageSquare, Mic, MicOff, Minimize, Minimize2, MinusCircle, MinusSquare, Minus, Monitor, Moon, MoreVertical, MousePointer, Move, Music, Navigation, Navigation2, Octagon, Package, Paperclip, PauseCircle, Pause, PenTool, Percent, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, Phone, PhoneOff, PhoneOutgoing, PieChart, Play, PlayCircle, Plus, PlusCircle, PlusSquare, Pocket, Power, Printer, Radio, RefreshCcw, RefreshCw, Repeat, Rewind, RotateCcw, RotateCw, Rss, Save, Scissors, Search, Send, Server, Settings, Share, Share2, Shield, ShieldOff, ShoppingBag, ShoppingCart, Shuffle, Sidebar, SkipBack, SkipForward, Slack, Slash, Sliders, Smartphone, Smile, Speaker, Square, Star, StopCircle, Sun, Sunrise, Sunset, Tablet, Tag, Target, Terminal, Thermometer, ThumbsDown, ThumbsUp, ToggleLeft, ToggleRight, Tool, Trash, Trash2, Trello, TrendingDown, TrendingUp, Triangle, Truck, Tv, Twitch, Twitter, Type, Umbrella, Underline, Unlock, Upload, UploadCloud, User, UserCheck, UserMinus, UserPlus, UserX, Users, Video, VideoOff, Voicemail, Volume, Volume1, Volume2, VolumeX, Watch, Wifi, WifiOff, Wind, XCircle, XOctagon, XSquare, X, Youtube, Zap, ZapOff, ZoomIn, ZoomOut } from 'angular-feather/icons';

import { AppsRoutes } from './apps.routing';

import { ChatComponent } from './chat/chat.component';
import { TicketsComponent } from './ticketlist/tickets.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';

import { TodosComponent } from './todos/todos.component';
import { NotesComponent } from './notes/notes.component';

// new
import { TasksComponent } from './tasks/tasks.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { MailboxComponent } from './mail/mailbox.component';
import { ListingComponent } from './mail/listing/listing.component';
import { DetailComponent } from './mail/detail/detail.component';
import { ComposeComponent } from './mail/compose/compose.component';

import { ContactComponent } from './contact/contact.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { EditAddUserComponent } from './users/edit-add-user/edit-add-user.component';

import { TicketService } from './ticketlist/tickets.service';
import { TimeAgoPipe } from './ticketlist/date-ago.pipe';
import { ContactService } from './contacts/contact.service';
import { NoteService } from './notes/note.service';
import { TodoService } from './todos/todo.service';
import { UserService } from './users/userService.service';
import { TasksService } from './tasks/tasks-service.service';

// New
import { MailGlobalVariable } from './mail/mail.service';
import { MailService } from './mail/mailService';

// rxjs
import { UserRxjsComponent } from './user-rxjs/user-rxjs.component';
import { UserRxjsServiceService } from './user-rxjs/user-rxjs-service.service';
import { ContactRxjsComponent } from './contact-rxjs/contact-rxjs.component';
import { ServiceContactrxjsService } from './contact-rxjs/service-contactrxjs.service';
import { ContactListRxjsComponent } from './contact-list-rxjs/contact-list-rxjs.component';
import { ServiceContactlistRxjsService } from './contact-list-rxjs/service-contactlist-rxjs.service';


import { InvoiceService } from './invoice/invoice.service';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { ListInvoicesComponent } from './invoice/list-invoices/list-invoices.component';
import { ViewInvoiceComponent } from './invoice/view-invoice/view-invoice.component';
import { EditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgbModalModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        QuillModule.forRoot(),
        RouterModule.forChild(AppsRoutes),
        PerfectScrollbarModule,
        Ng2SearchPipeModule,
        DragDropModule,
        FlatpickrModule.forRoot(),
        HttpClientModule,
        FeatherModule
    ],
    declarations: [
        ChatComponent,
        TicketsComponent,
        TicketdetailsComponent,
        TaskboardComponent,
        TodosComponent,
        ContactComponent,
        ContactsComponent,
        FullcalendarComponent,
        NotesComponent,
        TimeAgoPipe,
        ListUsersComponent,
        EditAddUserComponent,
        TasksComponent,
        ContactListComponent,
        MailboxComponent,
        ListingComponent,
        DetailComponent,
        ComposeComponent,
        UserRxjsComponent,
        ContactRxjsComponent,
        ContactListRxjsComponent,
        AddInvoiceComponent,
        ListInvoicesComponent,
        ViewInvoiceComponent,
        EditInvoiceComponent
    ],
    providers: [
        ContactService,
        NoteService,
        TodoService,
        UserService,
        DatePipe,
        TicketService,
        DecimalPipe,
        TasksService,
        MailService,
        MailGlobalVariable,
        UserRxjsServiceService,
        ServiceContactrxjsService,
        ServiceContactlistRxjsService,
        InvoiceService

    ]
})
export class AppsModule { }
