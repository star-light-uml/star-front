import { Injectable } from '@angular/core';

/**
 * 消息服务
 */
@Injectable()
export class MessageService {
    /**
     * 消息
     */
    private _message: string;
    /**
     * 消息类型
     * @type {string}
     */
    private _type = "error";

    /**
     * 消息框显示时间
     * @type {number}
     */
    private _time = 3000;

    /**
     * 开始计时的时间
     * @type {number}
     * @private
     */
    private _showTime: Date;

    private _status = "close";

    constructor() {
        window.setInterval(() => {
            this.check();
        }, 10);
    }

    private check() {
        if (this._status === "open") {
            const now = new Date();
            if ((now.getTime() - this._showTime.getTime()) > this.time) {
                this._status = "close";
            }
        }
    }

    showMessage(message: string, type: string = "error", time: number = 3000) {
        this.message = message;
        this.type = type;
        this.time = time;
        this._status = "open";
        this._showTime = new Date();
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get time(): number {
        return this._time;
    }

    set time(value: number) {
        this._time = value;
    }

    get status(): string {
        return this._status;
    }
}
