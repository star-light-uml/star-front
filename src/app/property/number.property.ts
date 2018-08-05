import {Property} from "./property";

export class NumberProperty extends Property {
    private _min = -99999999;
    private _max = 99999999;
    constructor() {
        super();
        this.editorKey = "number";
    }

    get min(): number {
        return this._min;
    }

    set min(value: number) {
        this._min = value;
    }

    get max(): number {
        return this._max;
    }

    set max(value: number) {
        this._max = value;
    }

    protected changeValue(value: any) {
        if (value < this.min || value > this.max) {
            return;
        }
        super.changeValue(value);
    }
}
