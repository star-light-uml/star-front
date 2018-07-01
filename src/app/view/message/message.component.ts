import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../../service/message.service";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, DoCheck {
    top = 0;

    constructor(public messageService: MessageService) { }

    ngOnInit() {
        this.top = window.innerHeight / 2 - 30;
    }

    ngDoCheck(): void {
        this.top = window.innerHeight / 2 - 30;
    }
}
