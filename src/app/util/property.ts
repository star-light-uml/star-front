/**
 * 属性基础类
 */
export class Property {
    /**
     * 属性值
     * @type {any}
     */
    private _value: any;

    /**
     * 属性名称
     * @type {string}
     */
    private _name: string;

    /**
     * 属性是否可变
     * @type {boolean}
     */
    private _editable = true;

    /**
     * 是否需要刷新页面
     * @type {boolean}
     * @private
     */
    private _needReDraw = false;

    /**
     *
     * @type {boolean}
     * @private
     */
    private _canvasDrawProperty = false;

    private _styleProperty = false;

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        if (this.editable) {
            if (this._value !== value) {
                this._needReDraw = true;
            }
            this._value = value;
        }
    }

    drawDone() {
        this._needReDraw = false;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get editable(): boolean {
        return this._editable;
    }

    set editable(value: boolean) {
        this._editable = value;
    }


    get canvasDrawProperty(): boolean {
        return this._canvasDrawProperty;
    }

    set canvasDrawProperty(value: boolean) {
        this._canvasDrawProperty = value;
    }

    get needReDraw(): boolean {
        return this._canvasDrawProperty && this._needReDraw;
    }


    get styleProperty(): boolean {
        return this._styleProperty;
    }

    set styleProperty(value: boolean) {
        this._styleProperty = value;
    }
}
