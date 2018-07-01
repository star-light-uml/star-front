
import {Widget} from "./widget";

export class AlternateProcessWidget extends Widget {
    constructor() {
        super();
        this.editProperty("height", "40px");
        this.editProperty("cav-height", 40);
        this.editProperty("radius", 10);
    }

    public drawSelf() {
        const width = this.getPropertyValue("cav-width") - 4;
        const height = this.getPropertyValue("cav-height") - 4;
        const radius = this.getPropertyValue("radius");
        this.context.beginPath();
        this.context.strokeStyle = "#404040";
        this.context.moveTo(1 + radius , 2);
        this.context.lineTo(width - radius, 2);
        this.context.arc(width - radius, 2 + radius, radius, 1.5 * Math.PI, 0);
        this.context.moveTo(width, 2 + radius);
        this.context.lineTo(width, height - radius);
        this.context.arc(width - radius, height - radius, radius, 0, 0.5 * Math.PI);
        this.context.moveTo(width - radius, height);
        this.context.lineTo(2 + radius, height);
        this.context.arc(2 + radius, height - radius, radius, 0.5 * Math.PI, Math.PI);
        this.context.moveTo(2, 2 + radius);
        this.context.lineTo(2, height - radius);
        this.context.arc(2 + radius, 2 + radius, radius,  Math.PI, 1.5 * Math.PI);
        this.context.lineWidth = 2;
        this.context.stroke();
        this.context.closePath();
    }
}
