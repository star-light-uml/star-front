
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

    public addProperty(property: Property) {
        if (!this._name2Property[property.name]) {
            this._name2Property[property.name] = property;
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

    public fixedProperty(name: string, fixed: boolean = false) {
        if (this._name2Property[name]) {
            this._name2Property[name].editable = !fixed;
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

    public draw() {

    }
}
