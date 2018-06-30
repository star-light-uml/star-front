
import {WidgetDescription} from "./widget.description";

/**
 * 组件类型
 */
export class WidgetType {
    /**
     * 组件关键字
     */
    private _key: string;
    /**
     * 组件分类名称
     */
    private _name: string;
    /**
     * 排序分值
     */
    private _sort: number;

    /**
     * 组件列表
     * @type {Array}
     * @private
     */
    private _widgets: WidgetDescription [] = [];

    /**
     * 通过名称查找组件
     * @type {{}}
     * @private
     */
    private _name2widget = {};

    /**
     * 注册组件信息
     * @param {WidgetDescription} widget
     */
    public registry(widget: WidgetDescription): void {
        if (!this._name2widget[widget.key]) {
            this._name2widget[widget.key] = widget;
            this._widgets.push(widget);
        }
    }

    /**
     * 获取组件列表
     * @returns {WidgetDescription[]}
     */
    public get widgets(): WidgetDescription [] {
        return this._widgets;
    }

    /**
     * 组件排序
     */
    public resort() {
        this._widgets.sort((a, b) => {
            return a.sort - b.sort;
        });
    }

    /**
     * 通过key获取组件信息
     * @param {string} key
     * @returns {WidgetDescription}
     */
    public widget(key: string): WidgetDescription {
        return this._name2widget[key];
    }


    get key(): string {
        return this._key;
    }

    set key(value: string) {
        this._key = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get sort(): number {
        return this._sort;
    }

    set sort(value: number) {
        this._sort = value;
    }
}
