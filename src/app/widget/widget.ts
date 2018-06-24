
import {Property} from "../util/property";

export class Widget {
    /**
     * 子组件
     * @type {Array}
     * @private
     */
    private _children: Widget [] = [];

    /**
     * 组件属性
     * @private
     */
    private _name2Property = {};
    private _properties: Property [] = [];
    private _drawing = false;

    /**
     * 绘图上下文
     */
    private _context;


    public get context() {
        return this._context;
    }

    public set context(value) {
        this._context = value;
    }

    public get children() {
        return this._children;
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
            width: this.property("width", "100px") ,
            height: this.property("height", "100px"),
            top: this.property("top", 0),
            left: this.property("left", 0)
        };
    }

    public test() {
        this.editProperty("cav-width", this.property("cav-width") - 1);
    }

    protected needDraw(): boolean {
        for (const pro of this.properties) {
            if (pro.needReDraw) {
               return true;
            }
        }
        return false;
    }

    protected drawDone(): void {
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
}
