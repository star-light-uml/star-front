import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Widget} from "../../../widget/widget";
import {RectProperty} from "../../../property/rect.property";

@Component({
  selector: 'app-widget-show',
  templateUrl: './widget.show.component.html',
  styleUrls: ['./widget.show.component.css']
})
export class WidgetShowComponent implements OnInit, AfterViewInit {
    @ViewChild("canvas") canvas: ElementRef;
    @Input("top") top: number;
    @Input("widget") widget: Widget;

    constructor() { }

    ngOnInit() {
    }

    getWidth() {
        const rect: RectProperty = <RectProperty>this.widget.getProperty("Rect");
        return rect.width.value;
    }

    getHeight() {
        const rect: RectProperty = <RectProperty>this.widget.getProperty("Rect");
        return rect.height.value;
    }

    ngAfterViewInit() {
        this.widget.targetContext = this.canvas.nativeElement.getContext("2d");
        this.widget.draw();
    }
}
