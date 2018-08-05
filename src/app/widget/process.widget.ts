import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";
import {Point} from "../base/point";

export class ProcessWidget extends Widget {
    constructor(parent: Widget) {
        super(parent);
    }

    public drawSelf() {
        const rect: RectProperty = <RectProperty> this.getProperty("Rect");
        this._context.beginPath();
        this._context.moveTo(0, 1);
        this._context.lineTo(rect.width.value - 1, 1);
        this._context.lineTo(rect.width.value - 1, rect.height.value - 1);
        this._context.lineTo(1, rect.height.value - 1);
        this._context.lineTo(1, 1);
        this._context.fillStyle = "#fff";
        this._context.fill();
        this._context.strokeStyle = "#404040";
        this._context.lineWidth = 2;
        this._context.stroke();
        this._context.closePath();
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
