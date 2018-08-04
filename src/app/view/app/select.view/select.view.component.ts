import {Component, Input, OnInit} from '@angular/core';
import {Point} from "../../../base/point";
import {StatusService} from "../../../service/status.service";
import {Utils} from "../../../util/utils";

@Component({
    selector: 'app-select-view',
    templateUrl: './select.view.component.html',
    styleUrls: ['./select.view.component.css']
})
export class SelectViewComponent implements OnInit {

    constructor(public statusService: StatusService) { }

    ngOnInit() {
    }

    getStyle() {
        const startPoint = this.statusService.background.startPoint;
        const  endPoint = this.statusService.background.endPoint;
        const result = {};
        result["left"] = ((startPoint.x > endPoint.x) ? endPoint.x : startPoint.x) + "px";
        result["top"] = ((startPoint.y > endPoint.y) ? endPoint.y : startPoint.y) + "px";
        let temp = startPoint.x - endPoint.x;
        if (temp < 0) {
            temp = -temp;
        }
        result["width"] = temp + "px";
        temp = startPoint.y - endPoint.y;
        if (temp < 0) {
            temp = -temp;
        }
        result["height"] = temp + "px";
        return result;
    }

    mouseUp(event) {
        this.statusService.background.mouseUp(event);
    }

    mouseMove(event) {
        this.statusService.background.mouseMove(event);
    }
}
