import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {WidgetService} from "../../service/widget.service";
import {ProjectService} from "../../service/project.service";
import {BackgroundWidget} from "../../widget/background.widget";
import {StatusService} from "../../service/status.service";
import {WidgetFactoryService} from "../../service/widget.factory.service";
import {RectProperty} from "../../property/rect.property";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    contentWidth = 1621;
    contentHeight = 811;

    background: BackgroundWidget = new BackgroundWidget();

    @ViewChild("canvas") canvas: ElementRef;
    context: any;

    constructor(public widgetService: WidgetService, public projectService: ProjectService, public statusService: StatusService,
                public widgetFactoryService: WidgetFactoryService) {
        widgetService.widgetInit();
        projectService.initProject();
    }

    ngAfterViewInit() {
        this.context = this.canvas.nativeElement.getContext("2d");
        this.background.targetContext = this.context;
        this.background.resize(this.contentWidth, this.contentHeight);
        this.background.draw();
    }

    mouseUp(event) {
        if (this.statusService.status === StatusService.NEW_ELEMENT) {
            this.statusService.status = StatusService.NORMAL;
            const widget = this.widgetFactoryService.createWidget(this.statusService.newElementKey);
            if (widget != null) {
                const rect: RectProperty = <RectProperty>widget.getProperty("Rect");
                rect.x.value = event.layerX;
                rect.y.value = event.layerY;
                this.background.addNewWidget(widget);
            }
        }
    }
}
