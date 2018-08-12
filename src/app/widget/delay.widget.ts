
import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";
import {Point} from "../base/point";

export class DelayWidget  extends Widget {

    constructor(parent: Widget) {
        super(parent);
    }

    public drawSelf() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        const height = rect.height.value - 1;
        const width = rect.width.value - 1;
        this._context.beginPath();
        this._context.strokeStyle = "#404040";
        this._context.moveTo(1, 1);
        this._context.arcTo(width, 1, width, height / 2, height / 2);
        this._context.arcTo(width, height, width - height / 2, height, height / 2);
        this._context.lineTo(1, height);
        this._context.lineTo(1, 0);
        this._context.fillStyle = "#fff";
        this._context.fill();
        this._context.lineWidth = 2;
        this._context.stroke();
        this._context.closePath();
    }
}
