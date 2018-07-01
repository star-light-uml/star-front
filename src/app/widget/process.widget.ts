import {Widget} from "./widget";

export class ProcessWidget extends Widget {
    constructor() {
        super();
        this.editProperty("cav-height", 40);
    }

    public drawSelf() {
        const width = this.getPropertyValue("cav-width");
        const height = this.getPropertyValue("cav-height");
        this.context.beginPath();
        this.context.moveTo(0, 1);
        this.context.lineTo(width - 1, 1);
        this.context.lineTo(width - 1, height - 1);
        this.context.lineTo(1, height - 1);
        this.context.lineTo(1, 1);
        this.context.fillStyle = "#fff";
        this.context.fill();
        this.context.strokeStyle = "#404040";
        this.context.lineWidth = 2;
        this.context.stroke();
        this.context.closePath();
    }
}
