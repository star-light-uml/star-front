
import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";

export class DelayWidget  extends Widget {

    constructor(parent: Widget) {
        super(parent);
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        rect.width.value = 100;
        rect.height.value = 40;
    }

    public drawSelf() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        const height = rect.height.value - 4;
        this._context.beginPath();
        this._context.strokeStyle = "#404040";
        this._context.arc(rect.width.value - height / 2 - 2, height / 2 + 2,
            height / 2, 1.5 * Math.PI, 0.5 * Math.PI);
        this._context.moveTo(rect.width.value - height / 2 - 2, 2);
        this._context.lineTo(2, 2);
        this._context.lineTo(2, height + 2);
        this._context.lineTo(rect.width.value - height / 2 - 2, height + 2);
        this._context.fillStyle = "#fff";
        this._context.fill();
        this._context.lineWidth = 2;
        this._context.stroke();
        this._context.closePath();
    }
}
