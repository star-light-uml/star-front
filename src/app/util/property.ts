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


    get value(): any {
        return this._value;
    }

    set value(value: any) {
        if (this.editable) {
            this._value = value;
        }
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
}
