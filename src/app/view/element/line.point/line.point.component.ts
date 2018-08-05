import {Component, Input, OnInit} from '@angular/core';
import {Point} from "../../../base/point";

@Component({
    selector: 'app-line-point',
    templateUrl: './line.point.component.html',
    styleUrls: ['./line.point.component.css']
})
export class LinePointComponent implements OnInit {

    @Input("point") point: Point;

    constructor() { }

    ngOnInit() {
    }

    getStyle() {
        return {
            "left": (this.point.x - 3) + "px",
            "top": (this.point.y - 3) + "px"
        };
    }
}
