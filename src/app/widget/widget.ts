
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
     * @type {Array}
     * @private
     */
    private _properties: Property [] = [];

    private _name2Property = {};

    public get children() {
        return this._children;
    }

    public addProperty(property: Property) {
        if (!this._name2Property[property.name]) {
            this._name2Property[property.name] = property;
            this._properties.push(property);
        }
    }

    public editProperty(name: string, value: any) {
        if (this._name2Property[name]) {
            this._name2Property[name].value = value;
        }
    }

    public property(name: string, def: any = "" ): any {
        if (this._name2Property[name]) {
            return this._name2Property[name].value;
        } else {
            return def;
        }
    }

    public cavStyle(): any {
        return {
            width: this.property("width", 100) + "px",
            height: this.property("height", 100) + "px"
        };
    }

    public divStype(): any {
        return {
            top: this.property("top", 0) + "px",
            left: this.property("left", 0) + "px"
        };
    }
}
