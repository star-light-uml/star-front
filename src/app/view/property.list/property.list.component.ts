import {Component, Input, OnInit} from '@angular/core';
import {Widget} from "../../widget/widget";

@Component({
    selector: 'app-property-list',
    templateUrl: './property.list.component.html',
    styleUrls: ['./property.list.component.css']
})
export class PropertyListComponent implements OnInit {

    @Input("widget") widget: Widget;

    constructor() { }

    ngOnInit() {
    }
}
