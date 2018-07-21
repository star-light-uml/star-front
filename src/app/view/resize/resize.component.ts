import {Component, Input, OnInit} from '@angular/core';
import {StatusService} from "../../service/status.service";

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

    constructor(public statusService: StatusService) { }

    ngOnInit() {
    }

    getStyle(key: string): any {
        const result = {};
        if (key === "lt") {
            result["left"] = (this.rect.left - 4) + "px";
            result["top"] = (this.rect.top - 4) + "px";
            result["cursor"] = "nw-resize";
        } else if (key === "rt") {
            result["left"] = (this.rect.right - 4) + "px";
            result["top"] = (this.rect.top - 4) + "px";
            result["cursor"] = "ne-resize";
        } else if (key === "lb") {
            result["left"] = (this.rect.left - 4) + "px";
            result["top"] = (this.rect.bottom - 4) + "px";
            result["cursor"] = "ne-resize";
        } else if (key === "rb") {
            result["left"] = (this.rect.right - 4) + "px";
            result["top"] = (this.rect.bottom - 4) + "px";
            result["cursor"] = "nw-resize";
        }
        return result;
    }

    getBodyStyle(): any {
        const result = {};
        result["top"] = this.rect.top + "px";
        result["left"] = this.rect.left + "px";
        result["width"] = (this.rect.right - this.rect.left) + "px";
        result["height"] = (this.rect.bottom - this.rect.top) + "px";
        return result;
    }

    moveMouseDown(event) {
        console.log(event);
        if (event.button === 0 && this.statusService.status === StatusService.NORMAL) {
            this.statusService.status = StatusService.RESIZE;
            this.statusService.resizeType = "move";
            this.statusService.lastPoint = null;
        }
    }
}
