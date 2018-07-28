import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";
import {Point} from "../base/point";
import {Utils} from "../util/utils";
import {StatusService} from "../service/status.service";

export class BackgroundWidget extends Widget {
    private _startPoint: Point;
    private _endPoint: Point;

    constructor() {
        super(null);
        this.container = true;
        this.selectable = false;
        this.key = "background";
        this.resize(1501, 811);
    }

    get startPoint(): Point {
        return this._startPoint;
    }

    set startPoint(value: Point) {
        this._startPoint = value;
    }

    get endPoint(): Point {
        return this._endPoint;
    }

    set endPoint(value: Point) {
        this._endPoint = value;
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


    public mouseDown(event) {
        if (event.buttons === 1) {
            if (this.statusService.status === StatusService.NORMAL) {
                this._startPoint = Utils.getPosition(event, this.id);
                this._endPoint = Utils.getPosition(event, this.id);
                this.statusService.status = StatusService.SELECTING;
            }
        }

        super.mouseDown(event);
    }

    public mouseUp(event) {
        if (this.statusService.status === StatusService.NORMAL
        || this.statusService.status === StatusService.SELECTING) {
            if (!event.ctrlKey) {
                this.statusService.cleanSelectWidget();
            }
        }
        if (this.statusService.status === StatusService.SELECTING) {
            this._endPoint = Utils.getPosition(event, this.id);
            this.statusService.status = StatusService.NORMAL;
            const lt = new Point();
            const rb = new Point();
            lt.x = (this.startPoint.x > this.endPoint.x) ? this.endPoint.x : this.startPoint.x;
            lt.y = (this.startPoint.y > this.endPoint.y) ? this.endPoint.y : this.startPoint.y;
            rb.x = (this.startPoint.x > this.endPoint.x) ? this.startPoint.x : this.endPoint.x;
            rb.y = (this.startPoint.y > this.endPoint.y) ? this.startPoint.y : this.endPoint.y;
            this.children.forEach((wid) => {
                this.select(wid, lt, rb);
            });
        }
    }

    public mouseMove(event) {
        if (this.statusService.status === StatusService.SELECTING) {
            this._endPoint = Utils.getPosition(event, this.id);
        }
    }

    private select(wid: Widget, lt: Point, rb: Point) {
        const rect = <RectProperty>wid.getProperty("Rect");
        const gx = wid.getGlobalX();
        const gy = wid.getGlobalY();
        const t_lt = new Point();
        const t_rb = new Point();

        t_lt.x = (lt.x < gx) ? lt.x : gx;
        t_lt.y = (lt.y < gy) ? lt.y : gy;
        t_rb.x = (rb.x > (gx + rect.width.value)) ? rb.x : (gx + rect.width.value);
        t_rb.y = (rb.y > (gy + rect.height.value)) ? rb.y : (gy + rect.height.value);

        if (t_rb.x - t_lt.x < rb.x - lt.x + rect.width.value && t_rb.y - t_lt.y < rb.y - lt.y + rect.height.value) {
            this.statusService.addSelectWidget(wid);
            wid.children.forEach((w) => {
                this.select(w, lt, rb);
            });
        }
    }
}
