import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Widget} from "../../widget/widget";

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

    @ViewChild("canvas") canvas: ElementRef;
    @Input("content") content: Widget;

    constructor() { }

    ngOnInit() {
    }
}
