import {Property} from "../property/property";
import {RectProperty} from "../property/rect.property";

export class Widget {
    /**
     * 子组件
     * @type {Array}
     * @private
     */
    private _children: Widget [] = [];

    /**
     * 属性列表
     * @type {Array}
     * @private
     */
    private _properties: Property [] = [];

    /**
     * 属性名称和属性的关系
     * @type {{}}
     * @private
     */
    private _name2Property = {};

    /**
     * 父组件
     */
    private _parent: Widget;

    /**
     * 是否可以被选中
     * @type {boolean}
     * @private
     */
    private _selectable = true;

    /**
     * canvas标签
     */
    private _element;

    /**
     * canvas标签的上下文
     */
    _context;

    /**
     * 最终绘制的canvas context
     */
    private _targetContext;


    get properties(): Property[] {
        return this._properties;
    }

    get children(): Widget[] {
        return this._children;
    }

    set children(value: Widget[]) {
        this._children = value;
    }

    get parent(): Widget {
        return this._parent;
    }

    set parent(value: Widget) {
        this._parent = value;
    }

    get selectable(): boolean {
        return this._selectable;
    }

    set selectable(value: boolean) {
        this._selectable = value;
    }

    set targetContext(value) {
        this._targetContext = value;
    }

    /**
     * 构造函数
     * @param {Widget} parent 父组件
     */
    constructor(parent: Widget) {
        this._parent = parent;
        if (this._parent != null) {
           this._parent._children.push(this);
           this._targetContext = this._parent._context;
        }
        this._element = document.createElement("canvas");
        this._context = this._element.getContext("2d");

        const rect = new RectProperty();
        rect.name = "Rect";
        this.addProperty(rect);
    }

    /**
     * 获取属性值
     * @param {string} name 属性名称
     * @param def 如果没有找到属性时返回的默认值
     * @returns {any}
     */
    public getPropertyValue(name: string, def: any = null): any {
        const pro = this._name2Property[name];
        if (pro != null) {
            return pro.value();
        } else {
            return def;
        }
    }

    /**
     * 获取属性
     * @param {string} name 属性名称
     * @returns {Property}
     */
    public getProperty(name: string): Property {
        return this._name2Property[name];
    }

    /**
     * 设置属性
     * @param {string} name 属性名称
     * @param value 属性值
     */
    public setProperty(name: string, value: any) {
        if (this._name2Property[name]) {
            this._name2Property[name].value = value;
        }
    }

    /**
     * 添加属性
     * @param {Property} property
     */
    public addProperty(property: Property) {
        if (this._name2Property[property.name]) {
            this._properties.slice(this._properties.indexOf(this._name2Property[property.name]), 1);
            this._name2Property[property.name] = null;
        }
        this._name2Property[property.name] = property;
        this._properties.push(property);
    }

    private _getGlobalX() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        if (this.parent != null) {
            return this.parent._getGlobalX() + rect.x.value;
        } else {
            return rect.x.value;
        }
    }

    private _getGlobalY() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        if (this.parent != null) {
            return this.parent._getGlobalY() + rect.y.value;
        } else {
            return rect.y.value;
        }
    }

    public draw() {
        this.drawSelf();
        for (let i = 0; i < this._children.length; i++) {
            this.children[i].draw();
        }
        this._targetContext.drawImage(this._element, this._getGlobalX(), this._getGlobalY());
    }

    public drawSelf() {

    }

    public resize(width: number, height: number) {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        rect.width.value = width;
        rect.height.value = height;
        this._element.width = width;
        this._element.height = height;
    }
}
