import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Widget} from "../../widget/widget";
import {RectProperty} from "../../property/rect.property";
import {StatusService} from "../../service/status.service";
import {WidgetFactoryService} from "../../service/widget.factory.service";
import {Point} from "../../base/point";
import {Utils} from "../../util/utils";

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit, AfterViewInit {

    @Input("widget") widget: Widget;

    @ViewChild("canvas") canvas: ElementRef;

    showLinePoint = false;

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

    getPanelStyle() {
        const rect: RectProperty = <RectProperty> this.widget.getProperty("Rect");
        const result =  {
            "height": rect.height.value + "px",
            "width": rect.width.value + "px"
        };

        if (this.statusService.status === StatusService.RESIZING) {
            result["cursor"] = Utils.getResizeCursor(this.statusService.resizeType);
        }

        return result;
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
