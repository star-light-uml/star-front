import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {Widget} from "../../../widget/widget";
import {Utils} from "../../../util/utils";
import {ProjectService} from "../../../service/project.service";

@Component({
    selector: 'app-resize',
    templateUrl: './resize.component.html',
    styleUrls: ['./resize.component.css']
})
export class ResizeComponent implements OnInit, DoCheck {
    @Input("width") width = 0;
    @Input("height") height = 0;
    @Input("widget") widget: Widget;

    private _oldPoint;
    private _oldRect;
    private _resizeType = "";

    constructor(public statusService: StatusService, public projectSelect: ProjectService) { }

    ngOnInit() {
    }

    ngDoCheck(): void {
        if (this.statusService.status === StatusService.RESIZE) {
            window.setTimeout(() => {
                this.resize();
            });
        }
    }

    private resize() {
        let x = this._oldPoint.x - this.statusService.mousePos["x"];
        let y = this._oldPoint.y - this.statusService.mousePos["y"];
        let newHeight = this._oldRect.height + y;
        let newWidth = this._oldRect.width + x;
        this.widget.focusDraw = true;
        if (this._resizeType === 'lt') {
            const finalSize = this.widget.checkSize(newWidth, newHeight, this._resizeType);
            y = finalSize.h - this._oldRect.height;
            x = finalSize.w - this._oldRect.width;
            this.widget.editProperty("top", (this._oldRect.top - y) + "px");
            this.widget.editProperty("left", (this._oldRect.left - x) + "px");
            this.widget.editProperty("cav-width", finalSize.w);
            this.widget.editProperty("cav-height", finalSize.h);
            this.statusService.resizeCursor = "nwse-resize";
        } else if (this._resizeType === 'l') {
            const finalSize = this.widget.checkSize(newWidth, this._oldRect.height, this._resizeType);
            x = finalSize.w - this._oldRect.width;
            this.widget.editProperty("left", (this._oldRect.left - x) + "px");
            this.widget.editProperty("cav-width", finalSize.w);
            this.statusService.resizeCursor = "ew-resize";
        } else if (this._resizeType === 't') {
            const finalSize = this.widget.checkSize(this._oldRect.width, newHeight, this._resizeType);
            y = finalSize.h - this._oldRect.height;
            this.widget.editProperty("top", (this._oldRect.top - y) + "px");
            this.widget.editProperty("cav-height", finalSize.h);
            this.statusService.resizeCursor = "ns-resize";
        } else if (this._resizeType === 'rt') {
            newHeight = this._oldRect.height + y;
            newWidth = this._oldRect.width - x;
            const finalSize = this.widget.checkSize(newWidth, newHeight, this._resizeType);
            y = finalSize.h - this._oldRect.height;
            this.widget.editProperty("top", (this._oldRect.top - y) + "px");
            this.widget.editProperty("cav-width", finalSize.w);
            this.widget.editProperty("cav-height", finalSize.h);
            this.statusService.resizeCursor = "nesw-resize";
        } else if (this._resizeType === 'r') {
            newWidth = this._oldRect.width - x;
            const finalSize = this.widget.checkSize(newWidth, this._oldRect.height, this._resizeType);
            y = finalSize.h - this._oldRect.height;
            this.widget.editProperty("top", (this._oldRect.top - y) + "px");
            this.widget.editProperty("cav-width", finalSize.w);
            this.statusService.resizeCursor = "ew-resize";
        } else if (this._resizeType === 'rb') {
            newHeight = this._oldRect.height - y;
            newWidth = this._oldRect.width - x;
            const finalSize = this.widget.checkSize(newWidth, newHeight, this._resizeType);
            this.widget.editProperty("cav-width", finalSize.w);
            this.widget.editProperty("cav-height", finalSize.h);
            this.statusService.resizeCursor = "nwse-resize";
        } else if (this._resizeType === 'b') {
            newHeight = this._oldRect.height - y;
            const finalSize = this.widget.checkSize(this._oldRect.width, newHeight, this._resizeType);
            this.widget.editProperty("cav-height", finalSize.h);
            this.statusService.resizeCursor = "ns-resize";
        } else if (this._resizeType === 'lb') {
            newHeight = this._oldRect.height - y;
            const finalSize = this.widget.checkSize(newWidth, newHeight, this._resizeType);
            x = finalSize.w - this._oldRect.width;
            this.widget.editProperty("left", (this._oldRect.left - x) + "px");
            this.widget.editProperty("cav-width", finalSize.w);
            this.widget.editProperty("cav-height", finalSize.h);
            this.statusService.resizeCursor = "nesw-resize";
        }
    }

    resizeDown(type: string, event) {
        if (event.buttons === 1) {
            this.projectSelect.cleanSelect();
            this.projectSelect.addSelect(this.widget);
            event.cancelBubble = true;
            this._resizeType = type;
            this._oldPoint = this.statusService.mousePos;
            this._oldRect = {
                width: this.widget.getPropertyValue("cav-width"),
                height: this.widget.getPropertyValue("cav-height"),
                top: Utils.getValue(this.widget.getPropertyValue("top")),
                left: Utils.getValue(this.widget.getPropertyValue("left"))
            };
            this.statusService.status = StatusService.RESIZE;
        }
    }
}
