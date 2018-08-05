
import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";
import {Point} from "../base/point";

export class AlternateProcessWidget extends Widget {

    /**
     * 圆角大小
     * @type {number}
     * @private
     */
    private _radius = 10;
    public drawSelf() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        const width = rect.width.value - 1;
        const height = rect.height.value - 1;
        this._context.beginPath();
        this._context.strokeStyle = "#404040";
        this._context.moveTo(1 + this._radius , 1);
        this._context.arcTo(width, 1, width, this._radius + 1, this._radius);
        this._context.arcTo(width, height, width - this._radius, height, this._radius);
        this._context.arcTo(1, height, 1, height - this._radius, this._radius);
        this._context.arcTo(1, 1, this._radius, 1, this._radius);
        this._context.fillStyle = "#fff";
        this._context.fill();
        this._context.lineWidth = 2;
        this._context.stroke();
        this._context.closePath();
    }

    calcLinePoint() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        this.pointList = [];
        this.pointList.push(new Point(0, rect.height.value / 2));
        this.pointList.push(new Point(rect.width.value / 2, 0));
        this.pointList.push(new Point(rect.width.value / 2, rect.height.value - 2));
        this.pointList.push(new Point(rect.width.value - 2, rect.height.value / 2));
    }
}
