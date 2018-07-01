
import {Widget} from "./widget";

export class PredefinedProcessWidget extends Widget {
    constructor() {
        super();
        this.editProperty("height", "40px");
        this.editProperty("cav-height", 40);
    }

    public drawSelf() {
        const width = this.getPropertyValue("cav-width") - 4;
        const height = this.getPropertyValue("cav-height") - 4;
        this.context.beginPath();
        this.context.strokeStyle = "#404040";
        this.context.moveTo(1, 2);
        this.context.lineTo(width, 2);
        this.context.lineTo(width, height);
        this.context.lineTo(2, height);
        this.context.lineTo(2, 2);
        this.context.moveTo(7, 2);
        this.context.lineTo(7, height);
        this.context.moveTo(width - 5, 2);
        this.context.lineTo(width - 5, height);
        this.context.fillStyle = "#fff";
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.stroke();
        this.context.closePath();
    }
}
