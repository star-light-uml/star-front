import {Component, OnInit} from '@angular/core';
import {WidgetService} from "../../util/widget.service";

@Component({
    selector: 'app-widget-list',
    templateUrl: './widget-list.component.html',
    styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

    constructor(public widgetService: WidgetService) { }

    ngOnInit() {
    }

}
