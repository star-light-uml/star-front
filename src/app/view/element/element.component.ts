import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Widget} from "../../widget/widget";
import {RectProperty} from "../../property/rect.property";
import {StatusService} from "../../service/status.service";
import {WidgetFactoryService} from "../../service/widget.factory.service";

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit, AfterViewInit {

    @Input("widget") widget: Widget;

    @ViewChild("canvas") canvas: ElementRef;

    constructor(public statusService: StatusService, public widgetFactory: WidgetFactoryService) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.widget) {
            this.widget.targetContext = this.canvas.nativeElement.getContext("2d");
        }
    }

    getStyle() {
        const rect: RectProperty = <RectProperty> this.widget.getProperty("Rect");
        return {
            "left": rect.x.value + "px",
            "top": rect.y.value + "px",
            "height": rect.height.value + "px",
            "width": rect.width.value + "px"
        };
    }

    mouseUp(event) {
        console.log(event);
        if (this.statusService.status === StatusService.NEW_ELEMENT) {
            if (event.button !== 0) {
                this.statusService.status = StatusService.NORMAL;
                return;
            }
            if (this.widget.container) {
                this.statusService.status = StatusService.NORMAL;
                const wid = this.widgetFactory.createWidget(this.statusService.newElementKey);
                if (wid) {
                    const rect = <RectProperty>wid.getProperty("Rect");
                    rect.x.value = event.offsetX;
                    rect.y.value = event.offsetY;
                    this.widget.addNewWidget(wid);
                }
            }
        }
    }
}
