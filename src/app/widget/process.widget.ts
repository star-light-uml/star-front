import {Widget} from "./widget";

export class ProcessWidget extends Widget {
    constructor() {
        super();
        this.editProperty("height", "60px");
        this.editProperty("cav-height", 60);
    }

    public drawSelf() {
        const width = this.getPropertyValue("cav-width") - 4;
        const height = this.getPropertyValue("cav-height") - 4;
        this.context.beginPath();
        this.context.strokeStyle = "#404040";
        this.context.moveTo(2, 2);
        this.context.lineTo(width, 2);
        this.context.lineTo(width, height);
        this.context.lineTo(2, height);
        this.context.lineTo(2, 2);
        this.context.lineWidth = 2;
        this.context.stroke();
        this.context.closePath();
    }
}
