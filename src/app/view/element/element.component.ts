import {Component, DoCheck, ElementRef, Input, ViewChild} from '@angular/core';
import {Widget} from "../../widget/widget";
import {StatusService} from "../../service/status.service";
import {WidgetFactoryService} from "../../service/widget.factory.service";

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.css']
})
export class ElementComponent implements DoCheck {

    @ViewChild("canvas") canvas: ElementRef;
    @Input("content") content: Widget;

    constructor(public statusService: StatusService, public widgetFactoryService: WidgetFactoryService) { }

    ngDoCheck(): void {
        if (this.content != null) {
            this.content.context = this.canvas.nativeElement.getContext("2d");
            if (this.content.context != null) {
                this.content.draw();
            }
        }
    }

    leftClick() {
        if (this.statusService.status === StatusService.NEW_ELEMENT) {
            this.statusService.status = StatusService.NORMAL;
            const wid = this.widgetFactoryService.createWidget(this.statusService.newElementObject["key"]);
            if (wid != null) {
                wid.focusDraw = true;
                this.content.addChild(wid);
            }
        }
    }

    containerStyle() {
        return {
            'width': this.content.getPropertyValue("cav-width") + 'px',
            'height': this.content.getPropertyValue("cav-height") + 'px',
            'left': this.content.getPropertyValue("padding-left"),
            'top': this.content.getPropertyValue("padding-top"),
            "box-shadow": this.content.getPropertyValue("box-shadow")
        };
    }
}
