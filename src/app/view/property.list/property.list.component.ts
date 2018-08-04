import {Component, Input, OnInit} from '@angular/core';
import {Widget} from "../../widget/widget";
import {StatusService} from "../../service/status.service";

@Component({
    selector: 'app-property-list',
    templateUrl: './property.list.component.html',
    styleUrls: ['./property.list.component.css']
})
export class PropertyListComponent implements OnInit {

    @Input("widget") widget: Widget;

    constructor(private statusService: StatusService) { }

    ngOnInit() {
    }
}
