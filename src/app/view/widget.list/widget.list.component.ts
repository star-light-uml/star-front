import { Component, OnInit } from '@angular/core';
import {WidgetDescription} from "../../util/widget.description";
import {WidgetService} from "../../service/widget.service";
import {RectProperty} from "../../property/rect.property";
import {StatusService} from "../../service/status.service";
import {Constant} from "../../service/constant";

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget.list.component.html',
  styleUrls: ['./widget.list.component.css']
})
export class WidgetListComponent implements OnInit {
    showWidget: WidgetDescription = null;
    showWidgetTop = 0;

    constructor(public widgetService: WidgetService, public statusService: StatusService) { }

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

    dragStart(event) {
        const img = document.createElement("img");
        img.src = this.showWidget.defaultWidget.element.toDataURL("image/png");
        event.dataTransfer.setDragImage(this.showWidget.defaultWidget.targetContext.canvas,
            Constant.NEW_ELEMENT_DROP_OFFSET, Constant.NEW_ELEMENT_DROP_OFFSET);
        event.dataTransfer.setData("type", "new");
        event.dataTransfer.setData("key", this.showWidget.key);
    }
}
