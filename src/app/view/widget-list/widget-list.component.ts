import {Component, ElementRef, OnInit} from '@angular/core';
import {WidgetService} from "../../service/widget.service";
import {WidgetDescription} from "../../util/widget.description";

@Component({
    selector: 'app-widget-list',
    templateUrl: './widget-list.component.html',
    styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

    showWidget: WidgetDescription = null;
    showWidgetTop = 0;

    constructor(public widgetService: WidgetService, private elementRef: ElementRef) { }

    ngOnInit() {
    }

    public enterItem(widget: WidgetDescription, event) {
        if (widget.defaultWidget == null) {
            return;
        }
        this.showWidget = widget;
        this.showWidget.defaultWidget.focusDraw = true;
        const top = event.currentTarget.offsetTop;
        let height = widget.defaultWidget.property("height", "100px");
        if (height.endsWith("px")) {
           height = height.substring(0, height.length - 2);
        }
        this.showWidgetTop = top - height / 2 + 10;
        if (this.showWidgetTop < 0) {
            this.showWidgetTop = 0;
        }
    }

}
