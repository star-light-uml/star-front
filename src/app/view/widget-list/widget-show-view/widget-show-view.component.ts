import {Component, Input, OnInit} from '@angular/core';
import {Widget} from "../../../widget/widget";

@Component({
    selector: 'app-widget-show-view',
    templateUrl: './widget-show-view.component.html',
    styleUrls: ['./widget-show-view.component.css']
})
export class WidgetShowViewComponent implements OnInit {

    @Input("widget") widget: Widget;
    @Input("top") top: number;

    constructor() { }

    ngOnInit() {
    }

}
