import {Property} from "./property";
import {NumberProperty} from "./number.property";

export class RectProperty extends Property {

    private _x = new NumberProperty();
    private _y = new NumberProperty();
    private _width = new NumberProperty();
    private _height = new NumberProperty();

    constructor() {
        super();
        this._x.name = "x";
        this._x.value = 0;
        this.children.push(this._x);
        this._y.name = "y";
        this._y.value = 0;
        this.children.push(this._y);
        this._width.name = "width";
        this._width.value = 100;
        this.children.push(this._width);
        this._height.name = "height";
        this._height.value = 100;
        this.children.push(this._height);
    }

    public showString(): string {
        return "[" + this._x.showString() + ", " + this._y.showString() + "] * ["
            + this._width.showString() + ", " + this._height.showString() + "]";
    }


    public get x(): NumberProperty {
        return this._x;
    }

    public get y(): NumberProperty {
        return this._y;
    }

    public get width(): NumberProperty {
        return this._width;
    }

    public get height(): NumberProperty {
        return this._height;
    }
}
