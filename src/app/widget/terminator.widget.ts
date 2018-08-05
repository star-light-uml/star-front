import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";
import {Point} from "../base/point";

export class TerminatorWidget extends Widget {

    public drawSelf() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        const height = rect.height.value - 1;
        const width = rect.width.value - 1;
        this._context.beginPath();
        this._context.strokeStyle = "#404040";
        this._context.moveTo(1 + height / 2 , 1);
        this._context.arcTo(width, 1, width, height / 2 + 1, height / 2);
        this._context.arcTo(width, height - 1, width - height / 2, height, height / 2);
        this._context.arcTo(1, height - 1, 1, height / 2, height / 2);
        this._context.arcTo(1, 1, height / 2, 1, height / 2);
        this._context.fillStyle = "#fff";
        this._context.fill();
        this._context.lineWidth = 2;
        this._context.stroke();
        this._context.closePath();
    }

    public fixRect() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        rect.height.min = 20;
        rect.width.min = rect.height.value;
        rect.height.max = rect.width.value;
    }

    calcLinePoint() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        this.pointList = [];
        this.pointList.push(new Point(0, rect.height.value / 2 - 1));
        this.pointList.push(new Point(rect.width.value / 2 - 1, 0));
        this.pointList.push(new Point(rect.width.value / 2 - 1, rect.height.value - 2));
        this.pointList.push(new Point(rect.width.value - 2, rect.height.value / 2 - 1));
    }
}
