import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";

export class BackgroundWidget extends Widget {

    constructor() {
        super(null);
        window.setInterval(() => {
            this.draw();
        }, 10);
    }

    drawSelf() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        this._context.beginPath();

        this._context.fillStyle = "#f2f2f2";
        this._context.fillRect(2, 2, rect.width.value, rect.height.value);

        this._context.fillStyle = "#fff";
        this._context.fillRect(0, 0, rect.width.value, rect.height.value);

        const gridWidth = 30;
        this._context.fillStyle = "#e5e5e5";
        for (let i = 0; i < (rect.height.value / gridWidth); i++) {
            this._context.fillRect(0, gridWidth * i, rect.width.value , 1);
        }
        for (let i = 0; i < (rect.width.value / gridWidth); i++) {
            this._context.fillRect(gridWidth * i, 0, 1, rect.height.value);
        }
        this._context.closePath();
    }
}
