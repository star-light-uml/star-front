/**
 * 属性基础类
 */
export class Property {
    private _valueChangeListener = [];
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

    private _parent: Property;

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        if (this.editable) {
            if (this._value !== value) {
                this._value = value;
                this._valueChangeListener.forEach((cb) => {
                    if (cb) {
                        cb(this, this.name);
                    }
                });
                if (this._parent) {
                    this._parent._childValueChange(this);
                }
            }
        }
    }

    private _childValueChange(property) {
        this._valueChangeListener.forEach((cb) => {
            if (cb) {
                cb(this, property.name);
            }
        });
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

    addChildren(value: Property) {
        this._children.push(value);
        value._parent = this;
    }

    public listener(cb: Function) {
        this._valueChangeListener.push(cb);
    }
}
