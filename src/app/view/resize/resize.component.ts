import {Component, Input, OnInit} from '@angular/core';
import {StatusService} from "../../service/status.service";
import {WidgetFactoryService} from "../../service/widget.factory.service";

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
        if (key === "lt") {
            result["left"] =  "-4px";
            result["top"] =  "-4px";
            result["cursor"] = "nw-resize";
        } else if (key === "rt") {
            result["left"] = (this.rect.right - this.rect.left - 5) + "px";
            result["top"] = "-4px";
            result["cursor"] = "ne-resize";
        } else if (key === "lb") {
            result["left"] = "-4px";
            result["top"] = (this.rect.bottom - this.rect.top - 5) + "px";
            result["cursor"] = "ne-resize";
        } else if (key === "rb") {
            result["left"] = (this.rect.right - this.rect.left - 5) + "px";
            result["top"] = (this.rect.bottom - this.rect.top - 5) + "px";
            result["cursor"] = "nw-resize";
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

    }

    mouseUp(event) {
        if (this.statusService.status === StatusService.SELECTING) {
            this.statusService.background.mouseUp(event);
        }
    }

    mouseMove(event) {
        if (this.statusService.status === StatusService.SELECTING) {
            this.statusService.background.mouseMove(event);
        }

    }
}
