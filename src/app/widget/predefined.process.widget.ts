
import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";
import {Point} from "../base/point";

export class PredefinedProcessWidget extends Widget {

    public drawSelf() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        const height = rect.height.value - 1;
        const width = rect.width.value - 1;
        this._context.beginPath();
        this._context.strokeStyle = "#404040";
        this._context.moveTo(1, 1);
        this._context.lineTo(width, 1);
        this._context.lineTo(width, height);
        this._context.lineTo(1, height);
        this._context.lineTo(1, 0);
        this._context.moveTo(7, 1);
        this._context.lineTo(7, height);
        this._context.moveTo(width - 5, 1);
        this._context.lineTo(width - 5, height);
        this._context.fillStyle = "#fff";
        this._context.fill();
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
