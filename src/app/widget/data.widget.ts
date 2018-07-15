import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";

export class DataWidget extends Widget {

    public drawSelf() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        const height = rect.height.value - 1;
        const width = rect.width.value - 1;
        this._context.beginPath();
        this._context.strokeStyle = "#404040";
        this._context.moveTo(16, 1);
        this._context.lineTo(width, 1);
        this._context.lineTo(width - 16, height);
        this._context.lineTo(1, height);
        this._context.lineTo(16, 0);
        this._context.fillStyle = "#fff";
        this._context.fill();
        this._context.lineWidth = 2;
        this._context.stroke();
        this._context.closePath();
    }
}