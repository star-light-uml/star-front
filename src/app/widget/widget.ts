import {Property} from "../property/property";
import {RectProperty} from "../property/rect.property";
import {Utils} from "../util/utils";
import {Constant} from "../service/constant";
import {StatusService} from "../service/status.service";
import {Point} from "../base/point";

export class Widget {
    private _id = "";
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
    private _element;

    /**
     * canvas标签的上下文
     */
    _context;

    /**
     * 最终绘制的canvas context
     */
    private _targetContext;


    private _pointList: any [] = [];

    private _statusService: StatusService;

    private _key;

    private _resizeStartRect;

    get resizeStartRect() {
        return this._resizeStartRect;
    }

    set resizeStartRect(value) {
        this._resizeStartRect = value;
    }

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

    get pointList(): any[] {
        return this._pointList;
    }

    set pointList(value: any[]) {
        this._pointList = value;
    }

    get selectable(): boolean {
        return this._selectable;
    }

    set selectable(value: boolean) {
        this._selectable = value;
    }

    get element() {
        return this._element;
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

    get targetContext() {
        return this._targetContext;
    }

    get container(): boolean {
        return this._container;
    }

    set container(value: boolean) {
        this._container = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get statusService(): StatusService {
        return this._statusService;
    }

    set statusService(value: StatusService) {
        this._statusService = value;
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
        this.resize(100, 40);

        this._id = Utils.getUuid();
        this.fixRect();
        this.calcLinePoint();
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
        property.listener((property, key) => {
            this.properChange(property, key);
        });
    }

    public getGlobalX() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        if (this.parent != null) {
            return this.parent.getGlobalX() + rect.x.value;
        } else {
            return rect.x.value;
        }
    }

    public getGlobalY() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        if (this.parent != null) {
            return this.parent.getGlobalY() + rect.y.value;
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
        this.fixRect();
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        rect.width.value = width;
        rect.height.value = height;
        const ratio = window.devicePixelRatio || 1;
        width = rect.width.value * ratio;
        height = rect.height.value * ratio;
        this._element.style.width = width + "px";
        this._element.style.height = height + "px";
        this._element.height = height;
        this._element.width = width ;
        this._context.scale(ratio, ratio);
        this.calcLinePoint();
        if (this._targetContext) {
            this.draw();
        }
    }

    public fixRect() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        rect.height.min = 20;
        rect.width.min = 40;
    }

    public addNewWidget(event, wid: Widget): boolean {
        if (!this.container) {
            if (this.parent !== null) {
                return this.parent.addNewWidget(event, wid);
            }
        }
        const pos = Utils.getPosition(event, this.id);
        const rect = <RectProperty>wid.getProperty("Rect");
        rect.x.value = pos.x - Constant.NEW_ELEMENT_DROP_OFFSET;
        rect.y.value = pos.y - Constant.NEW_ELEMENT_DROP_OFFSET;
        this.addChild(wid);
        return true;
    }

    properChange(property: Property, key: string) {
        if (property.name === "Rect" && (key === "width" || key === "height")) {
            this.rectChange(<RectProperty>property);
        }
    }

    rectChange(rect: RectProperty) {
        if (this._targetContext) {
            this._targetContext.canvas.width = rect.width.value;
            this._targetContext.canvas.height = rect.height.value;
            this.resize(rect.width.value, rect.height.value);
        }
    }


    get key() {
        return this._key;
    }

    set key(value) {
        this._key = value;
    }

    public mouseDown(event) {
        if (event.buttons === 1) {
            if (this.statusService.status === StatusService.NORMAL) {
                if (!event.ctrlKey) {
                    if (this.selectable && !this.selected) {
                        this.statusService.cleanSelectWidget();
                        this.statusService.addSelectWidget(this);
                    }
                } else {
                    if (this.selectable) {
                        if (!this.selected) {
                            this.statusService.addSelectWidget(this);
                        } else {
                            this.statusService.unSelectWidget(this);
                        }
                    }
                }
                const pt = Utils.getPosition(event, this.statusService.background.id);
                const rect = this.statusService.getSelectRect();
                this.statusService.moveClickPoint.x = pt.x - rect.left;
                this.statusService.moveClickPoint.y = pt.y - rect.top;
                this.statusService.status = StatusService.MOVING;
            }
        }
    }

    public mouseUp(event) {
        if (this.statusService.status === StatusService.SELECTING) {
            if (this.parent !== null) {
                this.parent.mouseUp(event);
            }
        } else if (this.statusService.status === StatusService.MOVING ||
            this.statusService.status === StatusService.RESIZING) {
            this.statusService.status = StatusService.NORMAL;
        }
    }

    public mouseMove(event) {
        if (this.statusService.status === StatusService.SELECTING ||
            this.statusService.status === StatusService.MOVING ||
            this.statusService.status === StatusService.RESIZING
        ) {
            if (this.parent !== null) {
                this.parent.mouseMove(event);
            }
        }
    }

    calcLinePoint() {
        const rect: RectProperty = <RectProperty>this.getProperty("Rect");
        this.pointList = [];
        this.pointList.push({
            pt: new Point(0, rect.height.value / 2),
            type: "l"
        });
        this.pointList.push({
            pt: new Point(rect.width.value / 2, 0),
            type: "t"
        });
        this.pointList.push({
            pt: new Point(rect.width.value / 2, rect.height.value - 2),
            type: "b"
        });
        this.pointList.push({
            pt: new Point(rect.width.value - 2, rect.height.value / 2),
            type: "r"
        });
    }
}
