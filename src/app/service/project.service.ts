import {Injectable} from "@angular/core";
import {BackgroundView} from "../widget/background.view";
import {Widget} from "../widget/widget";
import {WidgetFactoryService} from "./widget.factory.service";

@Injectable()
export class ProjectService {
    private _background: BackgroundView;

    private _selectWidget: Widget [] = [];

    constructor(public widgetFactoryService: WidgetFactoryService) {
    }

    initProject() {
        this._background = this.widgetFactoryService.createWidget("background");
    }

    get background(): BackgroundView {
        return this._background;
    }

    get selectWidget(): Widget [] {
        return this._selectWidget;
    }

    cleanSelect() {
        this._selectWidget.forEach((w) => {
           w.select = false;
        });
        this._selectWidget = [];
    }

    addSelect(widget: Widget) {
        if (widget.selectable) {
            widget.select = true;
            if (this._selectWidget.indexOf(widget) < 0) {
                this._selectWidget.push(widget);
            }
        }
    }

    unSelect(widget: Widget) {
        const index = this._selectWidget.indexOf(widget);
        if (index >= 0) {
            this._selectWidget.splice(index, 1);
            widget.select = false;
        }
    }
}
