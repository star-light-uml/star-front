import {Component} from '@angular/core';
import {WidgetService} from "../../service/widget.service";
import {ProjectService} from "../../service/project.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(public widgetService: WidgetService, public projectService: ProjectService) {
        widgetService.widgetInit();
        projectService.initProject();
    }
}
