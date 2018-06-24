import {Widget} from "./widget";

export class BackgroundView extends Widget {

    constructor() {
        super();
        this.editProperty("width", "800px");
        this.editProperty("height", "600px");
        this.editProperty("cav-width", 901);
        this.editProperty("cav-height", 901);

        this.getProperty("cav-width").canvasDrawProperty = true;
        this.getProperty("cav-height").canvasDrawProperty = true;
    }

    public drawSelf() {
        const width = this.getPropertyValue("cav-width") - 90;
        const height = this.getPropertyValue("cav-height") - 90;
        this.context.beginPath();

        this.context.fillStyle = "#f2f2f2";
        this.context.fillRect(5, 5, width + 80, height + 80);

        this.context.fillStyle = "#fff";
        this.context.fillRect(40, 40, width, height);

        const gridWidth = 30;
        this.context.fillStyle = "#e5e5e5";
        for (let i = 0; i < (height / gridWidth); i++) {
            this.context.fillRect(40, gridWidth * i + 40, width , 1);
        }
        for (let i = 0; i < (width / gridWidth); i++) {
            this.context.fillRect(gridWidth * i + 40, 40, 1, height);
        }
        this.context.closePath();
    }
}
