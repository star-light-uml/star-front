import {Injectable} from "@angular/core";
import {Widget} from "../widget/widget";
import {RectProperty} from "../property/rect.property";
import {BackgroundWidget} from "../widget/background.widget";
import {Property} from "../property/property";
import {Point} from "../base/point";

@Injectable()
export class StatusService {
    public static NORMAL = "normal";
    public static SELECTING = "selecting";
    public static RESIZING = "resizing";

    public static MOVING = "moving";

    private _moveClickPoint: Point = new Point();

    private _background: BackgroundWidget;

    private _selectWidget: Widget [] = [];

    private _status = StatusService.NORMAL;

    private _editingProperty: Property;

    private _resizeType;

    private _resizeStartPoint: Point;

    private _resizeStartRect;

    get resizeStartRect() {
        return this._resizeStartRect;
    }

    set resizeStartRect(value) {
        this._resizeStartRect = value;
    }

    get resizeStartPoint(): Point {
        return this._resizeStartPoint;
    }

    set resizeStartPoint(value: Point) {
        this._resizeStartPoint = value;
    }

    get resizeType() {
        return this._resizeType;
    }

    set resizeType(value) {
        this._resizeType = value;
    }

    get background(): BackgroundWidget {
        return this._background;
    }

    set background(value: BackgroundWidget) {
        this._background = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get selectWidget(): Widget[] {
        return this._selectWidget;
    }

    get editingProperty(): Property {
        return this._editingProperty;
    }

    set editingProperty(value: Property) {
        this._editingProperty = value;
    }

    get moveClickPoint(): Point {
        return this._moveClickPoint;
    }

    set moveClickPoint(value: Point) {
        this._moveClickPoint = value;
    }

    addSelectWidget(widget: Widget) {
        this.editingProperty = null;
        if (!widget || !widget.selectable || this._selectWidget.indexOf(widget) >= 0) {
            return;
        }
        widget.selected = true;
        this._selectWidget.push(widget);
    }

    cleanSelectWidget() {
        this.editingProperty = null;
        this.selectWidget.forEach((wid) => {
            wid.selected = false;
        });
        this._selectWidget = [];
    }

    unSelectWidget(widget: Widget) {
        this.editingProperty = null;
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
}
