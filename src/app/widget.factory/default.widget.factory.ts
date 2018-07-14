
import {WidgetBaseFactory} from "./widget.base.factory";
import {Widget} from "../widget/widget";

export class DefaultWidgetFactory extends WidgetBaseFactory {
    create(key: string): Widget {
        switch (key) {
            default:
                return null;
        }
    }
}
