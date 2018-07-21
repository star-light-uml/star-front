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
}
