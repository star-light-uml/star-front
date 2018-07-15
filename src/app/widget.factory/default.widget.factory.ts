
import {WidgetBaseFactory} from "./widget.base.factory";
import {Widget} from "../widget/widget";
import {DelayWidget} from "../widget/delay.widget";
import {ProcessWidget} from "../widget/process.widget";
import {AlternateProcessWidget} from "../widget/alternate.process.widget";
import {DataWidget} from "../widget/data.widget";
import {DecisionWidget} from "../widget/decision.widget";
import {PredefinedProcessWidget} from "../widget/predefined.process.widget";
import {TerminatorWidget} from "../widget/terminator.widget";

export class DefaultWidgetFactory extends WidgetBaseFactory {
    create(key: string): Widget {
        switch (key) {
            case "delay":
                return new DelayWidget(null);
            case "process":
                return new ProcessWidget(null);
            case "alternate-process":
                return new AlternateProcessWidget(null);
            case "data":
                return new DataWidget(null);
            case "decision":
                return new DecisionWidget(null);
            case "predefined-process":
                return new PredefinedProcessWidget(null);
            case "terminator":
                return new TerminatorWidget(null);
            default:
                return null;
        }
    }
}
