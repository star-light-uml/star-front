import {Point} from "./point";

export class Line {
    private _items: any [];

    constructor(start: Point) {
        this._items.push({
           "start": start,
            "end": start
        });
    }

    get items(): any[] {
        return this._items;
    }

    set items(value: any[]) {
        this._items = value;
    }
}
