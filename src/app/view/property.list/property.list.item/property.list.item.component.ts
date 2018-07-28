import {Component, Input, OnInit} from '@angular/core';
import {Property} from "../../../property/property";

@Component({
    selector: 'app-property-list-item',
    templateUrl: './property.list.item.component.html',
    styleUrls: ['./property.list.item.component.css']
})
export class PropertyListItemComponent implements OnInit {
    @Input("property") property: Property;
    @Input("level") level = 0;
    @Input("even") even = false;
    extend = false;

    backgroundColorList = [
        {
            light: "#fff2de",
            dark: "#ffe6bf"
        },
        {
            light: "#ffffde",
            dark: "#ffffbf",
        },
        {
            light: "#deffde",
            dark: "#bfffbf"
        }
    ];

    constructor() { }

    ngOnInit() {
    }

    getRowStyle() {
        const t = this.level % 3;
        return {
            "background": this.even ? this.backgroundColorList[t].dark : this.backgroundColorList[t].light
        };
    }
}
