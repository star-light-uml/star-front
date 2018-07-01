import {Widget} from "./widget";
import {StatusService} from "../service/status.service";

export class BackgroundView extends Widget {

    constructor() {
        super();
        this._container = true;
        this.selectable = false;
        this.editProperty("cav-width", 1801);
        this.editProperty("cav-height", 1801);
        this.setPadding("40px");
        this.editProperty("box-shadow", "0px 5px 10px 0px rgba(0, 0, 0, 0.3)")

        this.getProperty("cav-width").canvasDrawProperty = true;
        this.getProperty("cav-height").canvasDrawProperty = true;
    }

    public drawSelf() {
        const width = this.getPropertyValue("cav-width");
        const height = this.getPropertyValue("cav-height");
        this.context.beginPath();

        this.context.fillStyle = "#f2f2f2";
        this.context.fillRect(2, 2, width, height);

        this.context.fillStyle = "#fff";
        this.context.fillRect(0, 0, width, height);

        const gridWidth = 30;
        this.context.fillStyle = "#e5e5e5";
        for (let i = 0; i < (height / gridWidth); i++) {
            this.context.fillRect(0, gridWidth * i, width , 1);
        }
        for (let i = 0; i < (width / gridWidth); i++) {
            this.context.fillRect(gridWidth * i, 0, 1, height);
        }
        this.context.closePath();
    }


    mouseMove(event) {
        this.statusService.mousePos = {
            x: event.screenX,
            y: event.screenY
        };
        if (this.statusService.status === StatusService.RESIZE) {
            this.editProperty("container-cursor", this.statusService.resizeCursor);
            if (event.buttons !== 1) {
                this.statusService.status = StatusService.NORMAL;
            }
        } else {
            this.editProperty("container-cursor", null);
        }
    }
}
