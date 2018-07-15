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
     * 是否被修改过
     * @type {boolean}
     * @private
     */
    private _dirty = false;

    /**
     * 属性是否可变
     * @type {boolean}
     */
    private _editable = true;

    /**
     * 属性编辑器类型
     * @type {string}
     * @private
     */
    private _editorKey = "";

    /**
     * 子属性
     * @type {Array}
     * @private
     */
    private _children: Property [] = [];

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        if (this.editable) {
            if (this._value !== value) {
                this._value = value;
                this._dirty = true;
            }
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

    get dirty(): boolean {
        return this._dirty;
    }

    set dirty(value: boolean) {
        this._dirty = value;
    }


    get editorKey(): string {
        return this._editorKey;
    }

    set editorKey(value: string) {
        this._editorKey = value;
    }

    public showString(): string {
        return this._value;
    }


    get children(): Property[] {
        return this._children;
    }

    set children(value: Property[]) {
        this._children = value;
    }
}
