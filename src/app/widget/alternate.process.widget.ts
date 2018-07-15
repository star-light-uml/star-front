
import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";

export class AlternateProcessWidget extends Widget {
    /**
     * 圆角大小
     * @type {number}
     * @private
     */
    private _radius = 10;
    public drawSelf() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        const width = rect.width.value - 4;
        const height = rect.height.value - 4;
        this._context.beginPath();
        this._context.strokeStyle = "#404040";
        this._context.moveTo(1 + this._radius , 2);
        this._context.lineTo(width - this._radius, 2);
        this._context.arc(width - this._radius, 2 + this._radius, this._radius, 1.5 * Math.PI, 0);
        this._context.moveTo(width, 2 + this._radius);
        this._context.lineTo(width, height - this._radius);
        this._context.arc(width - this._radius, height - this._radius, this._radius, 0, 0.5 * Math.PI);
        this._context.moveTo(width - this._radius, height);
        this._context.lineTo(2 + this._radius, height);
        this._context.arc(2 + this._radius, height - this._radius, this._radius, 0.5 * Math.PI, Math.PI);
        this._context.moveTo(2, 2 + this._radius);
        this._context.lineTo(2, height - this._radius);
        this._context.arc(2 + this._radius, 2 + this._radius, this._radius,  Math.PI, 1.5 * Math.PI);
        this._context.lineWidth = 2;
        this._context.stroke();
        this._context.closePath();
    }
}
