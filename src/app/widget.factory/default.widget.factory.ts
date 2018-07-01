
import {WidgetBaseFactory} from "./widget.base.factory";
import {Widget} from "../widget/widget";
import {ProcessWidget} from "../widget/process.widget";
import {TerminatorWidget} from "../widget/terminator.widget";

export class DefaultWidgetFactory extends WidgetBaseFactory {
    create(key: string): Widget {
        switch (key) {
            case "process":
                return new ProcessWidget();
            case "terminator":
                return new TerminatorWidget();
            default:
                return null;
        }
    }
}
