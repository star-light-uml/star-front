import {Widget} from "./widget";

export class DecisionWidget extends Widget {
    constructor() {
        super();
        this.editProperty("height", "50px");
        this.editProperty("cav-height", 50);
    }

    public drawSelf() {
        const width = this.getPropertyValue("cav-width") - 4;
        const height = this.getPropertyValue("cav-height") - 4;
        this.context.beginPath();
        this.context.strokeStyle = "#404040";
        this.context.moveTo(width / 2 + 2, 2);
        this.context.lineTo(width, height / 2 + 2);
        this.context.lineTo(width / 2 + 2, height);
        this.context.lineTo(2, height / 2 + 2);
        this.context.lineTo(width / 2 + 2, 2);
        this.context.fillStyle = "#fff";
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.stroke();
        this.context.closePath();
    }
}
