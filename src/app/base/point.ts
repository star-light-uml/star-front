/**
 * 位置
 */
export class Point {
    /**
     * 横坐标
     * @type {number}
     * @private
     */
    private _x = 0;

    /**
     * 纵坐标
     * @type {number}
     * @private
     */
    private _y = 0;

    public constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
    }
}
