
import {WidgetBaseFactory} from "./widget.base.factory";
import {Widget} from "../widget/widget";
import {DelayWidget} from "../widget/delay.widget";

export class DefaultWidgetFactory extends WidgetBaseFactory {
    create(key: string): Widget {
        switch (key) {
            case "delay":
                return new DelayWidget(null);
            default:
                return null;
        }
    }
}
