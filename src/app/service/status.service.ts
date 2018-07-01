import {Injectable} from "@angular/core";

@Injectable()
export class StatusService {
    public static NORMAL = "normal";
    public static RESIZE = "resize";
    public static NEW_ELEMENT = "new-element";

    private _status = StatusService.NORMAL;

    private _resizeCursor = null;

    private _mousePos = {};

    private _newElementKey;

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
}
