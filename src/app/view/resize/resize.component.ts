import {Component, Input, OnInit} from '@angular/core';
import {StatusService} from "../../service/status.service";
import {WidgetFactoryService} from "../../service/widget.factory.service";
import {Utils} from "../../util/utils";
import {Point} from "../../base/point";
import {RectProperty} from "../../property/rect.property";

@Component({
    selector: 'app-resize',
    templateUrl: './resize.component.html',
    styleUrls: ['./resize.component.css']
})
export class ResizeComponent implements OnInit {

    @Input("rect") rect = {
        "left": 0,
        "top": 0,
        "bottom": 0,
        "right": 0
    };

    constructor(public statusService: StatusService, public widgetFactory: WidgetFactoryService) { }

    ngOnInit() {
    }

    getStyle(key: string): any {
        const result = {};
        result["cursor"] = Utils.getResizeCursor(key);
        if (key === "lt") {
            result["left"] =  "-4px";
            result["top"] =  "-4px";
        } else if (key === "rt") {
            result["left"] = (this.rect.right - this.rect.left - 5) + "px";
            result["top"] = "-4px";
        } else if (key === "lb") {
            result["left"] = "-4px";
            result["top"] = (this.rect.bottom - this.rect.top - 5) + "px";
        } else if (key === "rb") {
            result["left"] = (this.rect.right - this.rect.left - 5) + "px";
            result["top"] = (this.rect.bottom - this.rect.top - 5) + "px";
        }
        return result;
    }

    getBodyStyle(key: string): any {
        const result = {};
        if (key === "l") {
            result["left"] = "0px";
            result["top"] = "0px";
            result["width"] = "1px";
            result["height"] = (this.rect.bottom - this.rect.top - 1) + "px";
        } else if (key === "t") {
            result["left"] = "0px";
            result["top"] = "0px";
            result["width"] = (this.rect.right - this.rect.left - 1) + "px";
            result["height"] = "1px";
        } else if (key === "r") {
            result["left"] = (this.rect.right - this.rect.left - 1) + "px";
            result["top"] = "0px";
            result["width"] = "1px";
            result["height"] = (this.rect.bottom - this.rect.top - 1) + "px";
        } else if (key === "b") {
            result["left"] = "0px";
            result["top"] = (this.rect.bottom - this.rect.top - 1) + "px";
            result["width"] = (this.rect.right - this.rect.left - 1) + "px";
            result["height"] = "1px";
        }
        return result;
    }

    getPanelStyle(): any {
        return {
            "top": this.rect.top + "px",
            "left": this.rect.left + "px",
            "width": (this.rect.right - this.rect.left) + "px",
            "height": (this.rect.bottom - this.rect.top) + "px",
            "position": "absolute"
        };
    }

    drop(event) {
        if (event.dataTransfer.getData("type") === "new") {
            const wid = this.widgetFactory.createWidget(event.dataTransfer.getData("key"));
            if (wid !== null) {
                if (this.statusService.background.addNewWidget(event, wid)) {
                    this.statusService.cleanSelectWidget();
                    this.statusService.addSelectWidget(wid);
                }
            }
        }
    }

    dragOver(event) {
        event.preventDefault();
    }

    mouseDown(event) {
        const pt = Utils.getPosition(event, this.statusService.background.id);
        const rect = this.statusService.getSelectRect();
        this.statusService.moveClickPoint.x = pt.x - rect.left;
        this.statusService.moveClickPoint.y = pt.y - rect.top;
        this.statusService.status = StatusService.MOVING;
    }

    mouseUp(event) {
        this.statusService.background.mouseUp(event);
    }

    mouseMove(event) {
        this.statusService.background.mouseMove(event);
    }

    itemMouseDown(event, type) {
        this.statusService.status = StatusService.RESIZING;
        this.statusService.resizeType = type;
        this.statusService.resizeStartPoint = Utils.getPosition(event, this.statusService.background.id);
        this.statusService.resizeStartRect = this.statusService.getSelectRect();
        this.statusService.selectWidget.forEach((wid) => {
            const rect = <RectProperty>wid.getProperty("Rect");
            wid.resizeStartRect = {
                x: rect.x.value,
                y: rect.y.value,
                width: rect.width.value,
                height: rect.height.value
            };
        });
        event.cancelBubble = true;
    }
}
