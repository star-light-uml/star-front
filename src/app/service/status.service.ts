import {Injectable} from "@angular/core";

@Injectable()
export class StatusService {
    public static NORMAL = "normal";
    public static NEW_ELEMENT = "new-element";

    private _status = StatusService.NORMAL;

    private _newElementObject = {};

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }


    get newElementObject(): {} {
        return this._newElementObject;
    }

    set newElementObject(value: {}) {
        this._newElementObject = value;
    }
}
