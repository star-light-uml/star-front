
import {Property} from "../util/property";

export class Widget {
    /**
     * 子组件
     * @type {Array}
     * @private
     */
    private _children: Widget [] = [];

    private _parent: Widget;

    /**
     * 组件属性
     * @private
     */
    private _name2Property = {};
    private _properties: Property [] = [];
    private _drawing = false;
    private _focusDraw = false;
    protected _container = false;

    /**
     * 绘图上下文
     */
    private _context;

    constructor() {
        this.editProperty("cav-height", 100);
        this.editProperty("cav-width", 100);
        this.editProperty("margin-left", "0");
        this.editProperty("margin-right", "0");
        this.editProperty("margin-bottom", "0");
        this.editProperty("margin-top", "0");
        this.setPadding("0");
    }


    public get context() {
        return this._context;
    }

    public set context(value) {
        this._context = value;
    }

    public get children() {
        return this._children;
    }

    public addChild(widget: Widget) {
        if (this._container) {
            this.children.push(widget);
        } else {
            if (this._parent != null) {
                this._parent.addChild(widget);
            }
        }
    }

    get properties(): Property[] {
        return this._properties;
    }

    public addProperty(property: Property) {
        if (!this._name2Property[property.name]) {
            this._name2Property[property.name] = property;
            this.properties.push(property);
        }
    }

    public editProperty(name: string, value: any) {
        if (this._name2Property[name]) {
            this._name2Property[name].value = value;
        } else {
            const pro = new Property();
            pro.name = name;
            pro.value = value;
            this.addProperty(pro);
        }
    }

    public getProperty(name: string): Property {
        return this._name2Property[name];
    }

    public getPropertyValue(name: string): any {
        const pro = this._name2Property[name];
        if (pro != null) {
            return pro.value;
        } else {
            return null;
        }
    }

    public property(name: string, def: any = "" ): any {
        if (this._name2Property[name]) {
            return this._name2Property[name].value;
        } else {
            return def;
        }
    }

    public style(): any {
        return {
            top: this.property("top", 0),
            left: this.property("left", 0),
            "margin-left": this.property("margin-left", "0"),
            "margin-top": this.property("margin-top", "0"),
            "margin-right": this.property("margin-right", "0"),
            "margin-bottom": this.property("margin-bottom", "0"),
            "padding-left": this.property("padding-left", "0"),
            "padding-top": this.property("padding-top", "0"),
            "padding-right": this.property("padding-right", "0"),
            "padding-bottom": this.property("padding-bottom", "0"),
            "position": this.property("position", null)
        };
    }

    protected needDraw(): boolean {
        if (this._focusDraw) {
            return true;
        }
        for (const pro of this.properties) {
            if (pro.needReDraw) {
               return true;
            }
        }
        return false;
    }

    protected drawDone(): void {
        this._focusDraw = false;
        this.properties.forEach((pro) => {
            pro.drawDone();
        });
    }


    public draw() {
        if (this.needDraw() && !this._drawing) {
            this._drawing = true;
            window.setTimeout(() => {
                this.drawSelf();
                this.drawDone();
                this._drawing = false;
            }, 10);
        }
    }

    public drawSelf() {
    }


    set focusDraw(value: boolean) {
        this._focusDraw = value;
    }

    get parent(): Widget {
        return this._parent;
    }

    set parent(value: Widget) {
        this._parent = value;
    }

    setPadding(top: string, right: string = null, bottom: string = null, left: string = null) {
        if (right != null) {
            this.editProperty("padding-right", right);
        } else {
            this.editProperty("padding-right", top);
        }
        if (bottom != null) {
            this.editProperty("padding-bottom", bottom);
        } else {
            this.editProperty("padding-bottom", top);
        }
        if (left != null) {
            this.editProperty("padding-left", right);
        } else {
            this.editProperty("padding-left", top);
        }
        this.editProperty("padding-top", top);
    }
}
