import {Widget} from "./widget";
import {RectProperty} from "../property/rect.property";
import {Point} from "../base/point";
import {Utils} from "../util/utils";
import {StatusService} from "../service/status.service";
import {Line} from "../base/line";

export class BackgroundWidget extends Widget {
    private _startPoint: Point;
    private _endPoint: Point;

    constructor() {
        super(null);
        this.container = true;
        this.selectable = false;
        this.key = "background";
        this.resize(1501, 811);

        const rect = <RectProperty>this.getProperty("Rect");

        rect.x.editable = false;
        rect.y.editable = false;
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
        super.mouseUp(event);
    }

    public mouseMove(event) {
        super.mouseMove(event);
        if (this.statusService.status === StatusService.SELECTING) {
            this._endPoint = Utils.getPosition(event, this.id);
            if (event.buttons !== 1) {
                this.mouseUp(event);
            }
        } else if (this.statusService.status === StatusService.MOVING) {
            if (event.buttons !== 1) {
                this.statusService.status = StatusService.NORMAL;
            } else {
                const pos = Utils.getPosition(event, this.id);
                const pt = {
                    x: pos.x - this.statusService.moveClickPoint.x,
                    y: pos.y - this.statusService.moveClickPoint.y
                };

                const rect = this.statusService.getSelectRect();
                const bRect = <RectProperty>this.statusService.background.getProperty("Rect");
                if (pt.x < 0) {
                    pt.x = 0;
                }
                if ( pt.y < 0) {
                    pt.y = 0;
                }
                if (pt.x + rect.right - rect.left > bRect.width.value) {
                    pt.x = bRect.width.value - (rect.right - rect.left);
                }
                if (pt.y + rect.bottom - rect.top > bRect.height.value) {
                    pt.y = bRect.height.value - (rect.bottom - rect.top);
                }
                const dx = pt.x - rect.left;
                const dy = pt.y - rect.top;
                this.statusService.selectWidget.forEach((wid) => {
                    const r = <RectProperty>wid.getProperty("Rect");
                    r.x.value += dx;
                    r.y.value += dy;
                });
            }
        } else if (this.statusService.status === StatusService.RESIZING) {
            if (event.buttons !== 1) {
                this.statusService.status = StatusService.NORMAL;
            } else {
                const pt = Utils.getPosition(event, this.id);
                this._resize(pt, this.statusService.resizeType);
            }
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

    private _resize(pt: Point, type: string) {
        const dx = pt.x - this.statusService.resizeStartPoint.x;
        const dy = pt.y - this.statusService.resizeStartPoint.y;
        const r = this.statusService.resizeStartRect;

        let _dx, _dy;
        if (type === 'lb' || type === 'lt') {
            _dx = 1 - dx / (this.statusService.resizeStartRect.right - this.statusService.resizeStartRect.left);
        } else {
            _dx = 1 + dx / (this.statusService.resizeStartRect.right - this.statusService.resizeStartRect.left);
        }
        if (type === 'lt' || type === 'rt') {
            _dy = 1 - dy / (this.statusService.resizeStartRect.bottom - this.statusService.resizeStartRect.top);
        } else {
            _dy = 1 + dy / (this.statusService.resizeStartRect.bottom - this.statusService.resizeStartRect.top);
        }
        this.statusService.selectWidget.forEach((wid) => {
            const rect = <RectProperty>wid.getProperty("Rect");
            let temp = rect.width.min / wid.resizeStartRect.width;
            if (temp > _dx) {
                _dx = temp;
            }
            temp = rect.width.max / wid.resizeStartRect.width;
            if (temp < _dx) {
                _dx = temp;
            }
            temp = rect.height.min / wid.resizeStartRect.height;
            if ( temp > _dy) {
                _dy = temp;
            }
            temp = rect.height.max / wid.resizeStartRect.height;
            if (temp < _dy) {
                _dy = temp;
            }
        });
        this.statusService.selectWidget.forEach((wid) => {
            wid.resize(wid.resizeStartRect.width * _dx, wid.resizeStartRect.height * _dy);
            const rect = <RectProperty>wid.getProperty("Rect");
            if (type === 'lb' || type === 'lt') {
                rect.x.value = r.left + (1 - _dx) * (this.statusService.resizeStartRect.right - this.statusService.resizeStartRect.left)
                    + (wid.resizeStartRect.x - r.left) * _dx;
            } else {
                rect.x.value = r.left + (wid.resizeStartRect.x - this.statusService.resizeStartRect.left) * _dx;
            }
            if (type === 'lt' || type === 'rt') {
                rect.y.value = r.top + (1 - _dy) * (this.statusService.resizeStartRect.bottom - this.statusService.resizeStartRect.top)
                    + (wid.resizeStartRect.y - r.top) * _dy;
            } else {
                rect.y.value = r.top + (wid.resizeStartRect.y - this.statusService.resizeStartRect.top) * _dy;
            }
        });
    }

    calcLinePoint() {

    }
}
