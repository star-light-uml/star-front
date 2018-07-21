import {Injectable} from "@angular/core";
import {Widget} from "../widget/widget";
import {RectProperty} from "../property/rect.property";

@Injectable()
export class StatusService {
    public static NORMAL = "normal";
    public static RESIZE = "resize";
    public static NEW_ELEMENT = "new-element";

    private _selectWidget: Widget [] = [];

    private _status = StatusService.NORMAL;

    private _resizeCursor = null;

    private _mousePos = {};

    private _newElementKey;

    private _resizeType;

    private _lastPoint;

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get newElementKey() {
        return this._newElementKey;
    }

    set newElementKey(value) {
        this._newElementKey = value;
    }


    get mousePos(): {} {
        return this._mousePos;
    }

    set mousePos(value: {}) {
        this._mousePos = value;
    }


    get resizeCursor(): any {
        return this._resizeCursor;
    }

    set resizeCursor(value: any) {
        this._resizeCursor = value;
    }

    get selectWidget(): Widget[] {
        return this._selectWidget;
    }

    get resizeType() {
        return this._resizeType;
    }

    set resizeType(value) {
        this._resizeType = value;
    }

    addSelectWidget(widget: Widget) {
        if (!widget || !widget.selectable || this._selectWidget.indexOf(widget) >= 0) {
            return;
        }
        widget.selected = true;
        this._selectWidget.push(widget);
    }

    cleanSelectWidget() {
        this.selectWidget.forEach((wid) => {
            wid.selected = false;
        });
        this._selectWidget = [];
    }

    unSelectWidget(widget: Widget) {
        if (!widget) {
            return;
        }
        widget.selected = false;
        const index = this._selectWidget.indexOf(widget);
        this._selectWidget.splice(index, 1);
    }

    getSelectRect() {
        const rect = {
            "top": 9999999,
            "left": 9999999,
            "right": -9999999,
            "bottom": -9999999
        };
        this.selectWidget.forEach((wid) => {
            const r: RectProperty = <RectProperty>wid.getProperty("Rect");
            if (r.x.value < rect.left) {
                rect.left = r.x.value;
            }
            if (r.y.value < rect.top) {
                rect.top = r.y.value;
            }
            if (r.y.value + r.height.value > rect.bottom) {
                rect.bottom = r.y.value + r.height.value;
            }
            if (r.x.value + r.width.value > rect.right) {
                rect.right = r.x.value + r.width.value;
            }
        });

        return rect;
    }

    get lastPoint() {
        return this._lastPoint;
    }

    set lastPoint(value) {
        this._lastPoint = value;
    }
}
