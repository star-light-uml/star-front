
import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";

export class PredefinedProcessWidget extends Widget {

    public drawSelf() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        const height = rect.height.value - 4;
        const width = rect.width.value - 4;
        this._context.beginPath();
        this._context.strokeStyle = "#404040";
        this._context.moveTo(1, 2);
        this._context.lineTo(width, 2);
        this._context.lineTo(width, height);
        this._context.lineTo(2, height);
        this._context.lineTo(2, 2);
        this._context.moveTo(7, 2);
        this._context.lineTo(7, height);
        this._context.moveTo(width - 5, 2);
        this._context.lineTo(width - 5, height);
        this._context.fillStyle = "#fff";
        this._context.fill();
        this._context.lineWidth = 2;
        this._context.stroke();
        this._context.closePath();
    }
}
