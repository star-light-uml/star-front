import {Property} from "../property/property";
import {RectProperty} from "../property/rect.property";
import {StatusService} from "../service/status.service";

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
     * 是否被选中
     * @type {boolean}
     * @private
     */
    private _selected = false;

    /**
     * canvas标签
     */
    _element;

    /**
     * canvas标签的上下文
     */
    _context;

    /**
     * 最终绘制的canvas context
     */
    private _targetContext;

    private _key;

    /**
     * 是否是容器
     */
    private _container = false;


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

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
        this.draw();
    }

    set targetContext(value) {
        this._targetContext = value;
        this.rectChange(<RectProperty>this.getProperty("Rect"));
        this.draw();
    }

    get container(): boolean {
        return this._container;
    }

    set container(value: boolean) {
        this._container = value;
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
        rect.listener((p) => {
            this.properChange(p);
        });
        this.addProperty(rect);
        this.resize(100, 40);
    }

    public addChild(widget: Widget) {
        this.children.push(widget);
        widget.parent = this;
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
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        this._context.save();
        this._context.clearRect(0, 0, rect.width.value, rect.height.value);
        this.drawSelf();
        this._context.restore();
        for (let i = 0; i < this._children.length; i++) {
            this.children[i].draw();
        }
        const ratio = window.devicePixelRatio || 1;
        if (this._targetContext) {
            this._targetContext.scale(1 / ratio, 1 / ratio);
            this._targetContext.clearRect(0, 0, rect.width.value, rect.height.value);
            this._targetContext.drawImage(this._element, 0, 0);
            this._targetContext.scale(ratio, ratio);
        }
    }

    public drawSelf() {

    }

    public resize(width: number, height: number) {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        rect.width.value = width;
        rect.height.value = height;
        const ratio = window.devicePixelRatio || 1;
        width = width * ratio;
        height = height * ratio;
        this._element.style.width = width + "px";
        this._element.style.height = height + "px";
        this._element.height = height;
        this._element.width = width ;
        this._context.scale(ratio, ratio);
        if (this._targetContext) {
            this.draw();
        }
    }

    public _mouseUp(event) {
    }

    public addNewWidget(widget: Widget):boolean {
        if (!widget) {
            return false;
        }
        if (!this.container) {
            if (this.parent) {
               const rect: RectProperty = <RectProperty> this.getProperty("Rect");
               const widRect: RectProperty = <RectProperty> widget.getProperty("Rect");
                widRect.x.value = rect.x.value + widRect.x.value;
                widRect.y.value = rect.y.value + widRect.y.value;
                this.parent.addNewWidget(widget);
                return true;
            }
            return false;
        }
        this.addChild(widget);
        return true;
    }

    properChange(property: Property) {
        if (property.name === "Rect") {
            this.rectChange(<RectProperty>property);
        }
    }

    rectChange(rect: RectProperty) {
        if (this._targetContext) {
            this._targetContext.canvas.width = rect.width.value;
            this._targetContext.canvas.height = rect.height.value;
        }
    }


    get key() {
        return this._key;
    }

    set key(value) {
        this._key = value;
    }
}
