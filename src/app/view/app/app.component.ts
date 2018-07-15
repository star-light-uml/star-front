import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {WidgetService} from "../../service/widget.service";
import {ProjectService} from "../../service/project.service";
import {BackgroundWidget} from "../../widget/background.widget";

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

    constructor(public widgetService: WidgetService, public projectService: ProjectService) {
        widgetService.widgetInit();
        projectService.initProject();
    }

    ngAfterViewInit() {
        this.context = this.canvas.nativeElement.getContext("2d");
        this.background.targetContext = this.context;
        this.background.resize(this.contentWidth, this.contentHeight);
        this.background.draw();
    }
}
