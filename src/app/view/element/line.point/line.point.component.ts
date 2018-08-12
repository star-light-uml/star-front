import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Point} from "../../../base/point";
import {StatusService} from "../../../service/status.service";
import {Utils} from "../../../util/utils";
import {Line} from "../../../base/line";

@Component({
    selector: 'app-line-point',
    templateUrl: './line.point.component.html',
    styleUrls: ['./line.point.component.css']
})
export class LinePointComponent implements OnInit {

    @Input("point") point: Point;

    @Input("type") type: string;

    @Output("mouseOn") mouseOn = new EventEmitter();

    showArrow = false;

    constructor(private statusService: StatusService) { }

    ngOnInit() {
    }

    getStyle() {
        return {
            "left": (this.point.x - 3) + "px",
            "top": (this.point.y - 3) + "px"
        };
    }

    mouseDown(event) {
        const point = Utils.getPosition(event, this.statusService.background.id);
        const line = new Line(point);
        this.statusService.addLine(line);
        this.statusService.currentLine = line;

        this.statusService.status = StatusService.LINING;
    }

    mouseEnter() {
        this.mouseOn.emit(true);
        this.showArrow = true;
    }

    mouseLeave() {
        this.mouseOn.emit(false);
        this.showArrow = false;
    }
}
