
import {Injectable} from "@angular/core";
import {WidgetBaseFactory} from "../widget.factory/widget.base.factory";
import {StatusService} from "./status.service";

@Injectable()
export class WidgetFactoryService {
    private _factories: WidgetBaseFactory [] = [];

    constructor(public statusService: StatusService) {}

    addFactory(factory: WidgetBaseFactory) {
        this._factories.push(factory);
    }

    createWidget(key: string) {
        for (let i = 0; i < this._factories.length; i++) {
            const wid = this._factories[i].create(key);
            if (wid != null) {
                wid.statusService = this.statusService;
                return wid;
            }
        }
        return null;
    }
}
