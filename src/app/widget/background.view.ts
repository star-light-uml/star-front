import {Widget} from "./widget";

export class BackgroundView extends Widget {

    constructor() {
        super();
        this.editProperty("width", "800");
        this.editProperty("height", "600");
    }

    public draw() {
        super.draw();
        this.context.fillStyle = "red";
        this.context.fillRect(0, 0, 100, 100);
    }
}
