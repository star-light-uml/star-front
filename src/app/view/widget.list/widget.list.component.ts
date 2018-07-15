import { Component, OnInit } from '@angular/core';
import {WidgetDescription} from "../../util/widget.description";
import {WidgetService} from "../../service/widget.service";
import {RectProperty} from "../../property/rect.property";

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget.list.component.html',
  styleUrls: ['./widget.list.component.css']
})
export class WidgetListComponent implements OnInit {
    showWidget: WidgetDescription = null;
    showWidgetTop = 0;

    constructor(public widgetService: WidgetService) { }

    ngOnInit() {
    }

    public enterItem(widget: WidgetDescription, event) {
        this.showWidget = widget;
        const top = event.currentTarget.offsetTop;
        const rect: RectProperty = <RectProperty>widget.defaultWidget.getProperty("Rect");
        this.showWidgetTop = top - rect.height.value / 2 + 10;
        if (this.showWidgetTop < 0) {
            this.showWidgetTop = 0;
        }
    }

    click(widget) {
    }
}
