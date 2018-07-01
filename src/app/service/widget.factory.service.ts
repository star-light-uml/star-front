
import {Injectable} from "@angular/core";
import {WidgetBaseFactory} from "../widget.factory/widget.base.factory";

@Injectable()
export class WidgetFactoryService {
    private _factories: WidgetBaseFactory [] = [];

    addFactory(factory: WidgetBaseFactory) {
        this._factories.push(factory);
    }

    createWidget(key: string) {
        for (let i = 0; i < this._factories.length; i++) {
            const wid = this._factories[i].create(key);
            if (wid != null) {
                return wid;
            }
        }
        return null;
    }
}
