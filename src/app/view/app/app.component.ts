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
export class AppComponent {

    background: BackgroundWidget = new BackgroundWidget();

    constructor(public widgetService: WidgetService, public projectService: ProjectService, public statusService: StatusService,
                public widgetFactoryService: WidgetFactoryService) {
        widgetService.widgetInit();
        projectService.initProject();
    }

    mouseMove(event) {
        if (this.statusService.status === StatusService.RESIZE) {
            if (event.buttons !== 1) {
                this.statusService.status = StatusService.NORMAL;
                return;
            }
            const pt = this.getBackgroundPosition(event);
            if (this.statusService.lastPoint) {
                if (this.statusService.resizeType === "move") {
                    const dx = this.statusService.lastPoint.x - pt.x;
                    const dy = this.statusService.lastPoint.y - pt.y;
                    this.statusService.selectWidget.forEach((wid) => {
                        const rect: RectProperty = <RectProperty>wid.getProperty("Rect");
                        rect.x.value = rect.x.value - dx;
                        rect.y.value = rect.y.value - dy;
                    });
                    this.statusService.lastPoint = pt;
                }
            } else {
                this.statusService.lastPoint = pt;
            }
        }
    }

    getBackgroundPosition(event): any {
        let x = event.offsetX;
        let y = event.offsetY;
        let index = 0;
        while (index < event.path.length) {
            if (event.path[index].classList.contains("background-element")) {
                break;
            }
            x += event.path[index].offsetLeft;
            y += event.path[index].offsetTop;
            index += 1;
        }
        return {
            x: x,
            y: y
        };
    }
}
