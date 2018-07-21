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

        if (this.widget.selected) {
            style["cursor"] = "move";
        }

        if (this.statusService.status === StatusService.RESIZE) {
            if (this.statusService.resizeType === "move") {
                style["cursor"] = "move";
            }
        }

        return style;
    }

    mouseDown(event) {
        if (this.statusService.status === StatusService.NORMAL) {
            if (event.button !== 0) {
                return;
            }
            if (!event.ctrlKey && !this.widget.selected) {
                this.statusService.cleanSelectWidget();
            }
            if (this.widget.selectable) {
                if (event.ctrlKey && this.widget.selected) {
                    this.statusService.unSelectWidget(this.widget);
                } else {
                    this.statusService.addSelectWidget(this.widget);
                }
            }
            if (event.button === 0 && this.widget.selected) {
                this.statusService.status = StatusService.RESIZE;
                this.statusService.resizeType = "move";
                this.statusService.lastPoint = null;
            }
        }
    }

    mouseUp(event) {
        if (this.statusService.status === StatusService.NEW_ELEMENT) {
            if (event.button !== 0) {
                this.statusService.status = StatusService.NORMAL;
                return;
            }
            this.statusService.status = StatusService.NORMAL;
            const wid = this.widgetFactory.createWidget(this.statusService.newElementKey);
            if (wid) {
                const rect = <RectProperty>wid.getProperty("Rect");
                rect.x.value = event.offsetX;
                rect.y.value = event.offsetY;
                if (this.widget.addNewWidget(wid)) {
                    this.statusService.cleanSelectWidget();
                    this.statusService.addSelectWidget(wid);
                }
            }
            event.cancelBubble = true;
        } else if (this.statusService.status === StatusService.RESIZE) {
            this.statusService.status = StatusService.NORMAL;
        }
    }
}
