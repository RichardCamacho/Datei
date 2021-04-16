import { Component, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Chat } from './chat';
import { ContactList } from './contactList';
import { ChatMessages } from './chatMessages';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

    public config: PerfectScrollbarConfigInterface = {};

    public showSidebar = false;
    public now: Date | null = null;
    activeChatUserId = 1;
    activeChatUser: string | null | undefined = '';
    activeChatUserImg: string | null = '';
    activeChatUserStatus = '';

    @ViewChild('messageInput', { static: true })
    messageInputRef: ElementRef | null = null;

    messages = new Array();

    contactList: ContactList[] | null = null;

    savedMessages: Chat[] | null = null;


    constructor() {


        const chatMessage: ChatMessages = new ChatMessages();
        this.contactList = [
            {
                id: 1,
                imagePath: 'assets/images/users/1.jpg',
                name: 'Steve Rogers',
                signature: 'Hey Banner, where are you?',
                time: '9:30AM',
                chats: chatMessage.chat1,
            },
            {
                id: 2,
                imagePath: 'assets/images/users/2.jpg',
                name: 'Ram',
                signature: 'ram ram ram .....',
                time: '10:30AM',
                chats: chatMessage.chat2,
            },
            {
                id: 3,
                imagePath: 'assets/images/users/3.jpg',
                name: 'Shyam',
                signature: 'shyam shyam .....',
                time: '11:30AM',
                chats: chatMessage.chat3,
            },
            {
                id: 4,
                imagePath: 'assets/images/users/4.jpg',
                name: 'Mark',
                signature: 'mark mark ......',
                time: '8:30AM',
                chats: chatMessage.chat4,
            },
            {
                id: 5,
                imagePath: 'assets/images/users/5.jpg',
                name: 'Robin',
                signature: 'robin robin ......',
                time: '6:30AM',
                chats: chatMessage.chat5,
            }

        ];


        // tslint:disable-next-line:no-non-null-assertion
        this.activeChatUser = this.contactList!.find(x => x.id === 1)?.name;
        // tslint:disable-next-line:no-non-null-assertion
        this.activeChatUserImg = this.contactList!.find(x => x.id === 1)!.imagePath;
        // tslint:disable-next-line:no-non-null-assertion
        this.savedMessages = this.contactList!.find(x => x.id === 1)!.chats;



        this.activeChatUserStatus = 'Online';
    }

    ngOnInit() {

    }

    // chat user list click event function
    setActive(chatId: number) {

        this.savedMessages = new Array();
        this.messages = [];
        if (this.contactList !== null) {
            for (let i = 0; i < this.contactList.length; i++) {

                if (this.contactList[i].id === chatId) {
                    this.activeChatUserId = this.contactList[i].id;
                    this.activeChatUser = this.contactList[i].name;
                    this.activeChatUserImg = this.contactList[i].imagePath;
                    this.savedMessages = this.contactList[i].chats;

                    this.activeChatUserStatus = 'Online';
                }
            }
        }
    }



    onAddMessage() {

        if (this.messageInputRef?.nativeElement.value !== '') {
            this.messages.push(this.messageInputRef?.nativeElement.value);
        }
        if (this.messageInputRef !== null) {
            this.messageInputRef.nativeElement.value = '';
            this.messageInputRef.nativeElement.focus();
        }

        this.now = new Date();
    }

    mobileSidebar() {
        this.showSidebar = !this.showSidebar;
    }

}

