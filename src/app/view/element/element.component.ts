import {Component, DoCheck, ElementRef, Input, ViewChild} from '@angular/core';
import {Widget} from "../../widget/widget";

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.css']
})
export class ElementComponent implements DoCheck {

    @ViewChild("canvas") canvas: ElementRef;
    @Input("content") content: Widget;

    constructor() { }

    ngDoCheck(): void {
        this.content.context = this.canvas.nativeElement.getContext("2d");
        if (this.content.context != null) {
            this.content.draw();
        }
    }
}
