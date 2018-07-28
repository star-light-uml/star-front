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
        const style =  {
            "left": rect.x.value + "px",
            "top": rect.y.value + "px",
            "height": rect.height.value + "px",
            "width": rect.width.value + "px"
        };
        return style;
    }

    mouseDown(event) {
        this.widget.mouseDown(event);
    }

    mouseUp(event) {
        this.widget.mouseUp(event);
    }

    mouseMove(event) {
        this.widget.mouseMove(event);
    }

    drop(event) {
        if (event.dataTransfer.getData("type") === "new") {
            const wid = this.widgetFactory.createWidget(event.dataTransfer.getData("key"));
            if (wid !== null) {
                if (this.widget.addNewWidget(event, wid)) {
                    this.statusService.cleanSelectWidget();
                    this.statusService.addSelectWidget(wid);
                }
            }
        }
    }

    dragOver(event) {
        event.preventDefault();
    }

    dragStart() {
        return false;
    }
}
