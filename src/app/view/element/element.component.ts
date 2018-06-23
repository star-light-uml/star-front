import {AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Widget} from "../../widget/widget";

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.css']
})
export class ElementComponent implements AfterContentInit {

    @ViewChild("canvas") canvas: ElementRef;
    @Input("content") content: Widget;

    constructor() { }

    ngAfterContentInit() {
        this.content.context = this.canvas.nativeElement.getContext("2d");
        this.content.draw();
    }
}
