import {Injectable} from "@angular/core";
import {Widget} from "../widget/widget";
import {WidgetFactoryService} from "./widget.factory.service";

@Injectable()
export class ProjectService {

    private _selectWidget: Widget [] = [];

    constructor(public widgetFactoryService: WidgetFactoryService) {
    }

    initProject() {
    }
}
