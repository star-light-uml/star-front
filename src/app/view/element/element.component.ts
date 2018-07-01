import {Component, DoCheck, ElementRef, Input, ViewChild} from '@angular/core';
import {Widget} from "../../widget/widget";
import {StatusService} from "../../service/status.service";
import {WidgetFactoryService} from "../../service/widget.factory.service";
import {ProjectService} from "../../service/project.service";

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.css']
})
export class ElementComponent implements DoCheck {

    @ViewChild("canvas") canvas: ElementRef;
    @Input("content") content: Widget;

    constructor(public statusService: StatusService,
                public widgetFactoryService: WidgetFactoryService,
                public projectService: ProjectService) { }

    ngDoCheck(): void {
        if (this.content != null) {
            this.content.context = this.canvas.nativeElement.getContext("2d");
            if (this.content.context != null) {
                this.content.draw();
            }
        }
    }

    leftClick(event) {
        event.cancelBubble = true;
        if (this.statusService.status === StatusService.NEW_ELEMENT) {
            this.statusService.status = StatusService.NORMAL;
            const wid = this.widgetFactoryService.createWidget(this.statusService.newElementKey);
            if (wid != null) {
                wid.editProperty("left", event.offsetX + "px");
                wid.editProperty("top", event.offsetY + "px");
                wid.focusDraw = true;
                if (this.content.addChild(wid)) {
                    this.projectService.cleanSelect();
                    this.projectService.addSelect(wid);
                }
            }
        } else if (this.statusService.status === StatusService.NORMAL) {
            if (!event.ctrlKey) {
                this.projectService.cleanSelect();
            }
            if (event.ctrlKey && this.content.select) {
                this.projectService.unSelect(this.content);
            } else {
                this.projectService.addSelect(this.content);
            }
        }
    }

    containerStyle() {
        return {
            'width': this.content.getPropertyValue("cav-width") + 'px',
            'height': this.content.getPropertyValue("cav-height") + 'px',
            'left': this.content.getPropertyValue("padding-left"),
            'top': this.content.getPropertyValue("padding-top"),
            "box-shadow": this.content.getPropertyValue("box-shadow"),
            "cursor": this.content.getPropertyValue("container-cursor")
        };
    }

    resizeStyle() {
        return {
            'width': (this.content.getPropertyValue("cav-width") + 12) + 'px',
            'height': (this.content.getPropertyValue("cav-height") + 12) + 'px',
        };
    }
}
