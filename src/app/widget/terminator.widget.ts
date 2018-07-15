import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";

export class TerminatorWidget extends Widget {

    public drawSelf() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        const height = rect.height.value - 4;
        const width = rect.width.value - 4;
        this._context.beginPath();
        this._context.strokeStyle = "#404040";
        this._context.arc(height / 2 + 2, height / 2 + 2, height / 2, 0.5 * Math.PI, 1.5 * Math.PI);
        this._context.arc(width - height / 2 + 2, height / 2 + 2, height / 2, 1.5 * Math.PI, 0.5 * Math.PI);
        this._context.moveTo(height / 2 + 2, 2);
        this._context.lineTo(width - height / 2 + 2, 2);
        this._context.moveTo(height / 2 + 2, height + 2);
        this._context.lineTo(width - height / 2 + 2, height + 2);
        this._context.fillStyle = "#fff";
        this._context.fill();
        this._context.lineWidth = 2;
        this._context.stroke();
        this._context.closePath();
    }
}
