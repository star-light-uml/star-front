import {Component, Input, OnInit} from '@angular/core';
import {Line} from "../../base/line";

@Component({
    selector: 'app-line',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

    @Input("line") line: Line;

    constructor() { }

    ngOnInit() {

    }

}
