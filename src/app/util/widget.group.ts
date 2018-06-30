
import {WidgetType} from "./widget.type";
import {WidgetDescription} from "./widget.description";

/**
 * 组件分组管理
 */
export class WidgetGroup {
    /**
     * 组件分组
     * @type {Array}
     * @private
     */
    private _widgetType: WidgetType [] = [];
    /**
     * 通过名称定位分组
     * @type {{}}
     * @private
     */
    private _name2type = {};

    /**
     * 添加类型
     * @param {string} name 类型显示名称
     * @param {string} key 类型关键字
     * @param {number} sort 排序值
     */
    public addType(name: string, key: string, sort: number) {
        if (this._name2type[key]) {
            return;
        }
        const type = new WidgetType();
        type.sort = sort;
        type.name = name;
        type.key = key;
        this._widgetType.push(type);
        this._name2type[key] = type;
    }

    /**
     * 注册组件
     * @param {WidgetDescription} widget 组件信息
     */
    public registryWidget( widget: WidgetDescription) {
        const type = this._name2type[widget.type];
        if (type != null) {
           type.registry(widget);
        }
    }

    /**
     * 获取组件信息
     * @param {string} key 组件关键字
     * @returns {WidgetDescription}
     */
    public widget(key: string): WidgetDescription {
        let result;
        for (let i = 0; i < this._widgetType.length; i++) {
            result = this._widgetType[i].widget(key);
            if (result !== null) {
                return result;
            }
        }
        return null;
    }

    /**
     * 组件重新排序
     * @param {string} type
     */
    public resort(type: string = null) {
        if (type !== null) {
            if (this._name2type[type]) {
                this._name2type[type].resort();
            }
        } else {
          this._widgetType.forEach((widgetType) => {
             widgetType.resort();
          });
        }
    }

    /**
     * 获取组件类型
     * @returns {WidgetType[]}
     */
    get widgetType(): WidgetType[] {
        return this._widgetType;
    }

    /**
     * 组件类型重新排序
     */
    public typeResort() {
        this._widgetType.sort((a, b) => {
            return a.sort - b.sort;
        });
    }
}
