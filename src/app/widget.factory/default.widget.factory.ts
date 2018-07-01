
import {WidgetBaseFactory} from "./widget.base.factory";
import {Widget} from "../widget/widget";
import {ProcessWidget} from "../widget/process.widget";
import {TerminatorWidget} from "../widget/terminator.widget";
import {DecisionWidget} from "../widget/decision.widget";
import {DelayWidget} from "../widget/delay.widget";
import {PredefinedProcessWidget} from "../widget/predefined.process.widget";
import {AlternateProcessWidget} from "../widget/alternate.process.widget";
import {DataWidget} from "../widget/data.widget";
import {BackgroundView} from "../widget/background.view";

export class DefaultWidgetFactory extends WidgetBaseFactory {
    create(key: string): Widget {
        switch (key) {
            case "background":
                return new BackgroundView();
            case "process":
                return new ProcessWidget();
            case "terminator":
                return new TerminatorWidget();
            case "decision":
                return new DecisionWidget();
            case "delay":
                return new DelayWidget();
            case "predefined-process":
                return new PredefinedProcessWidget();
            case "alternate-process":
                return new AlternateProcessWidget();
            case "data":
                return new DataWidget();
            default:
                return null;
        }
    }
}
