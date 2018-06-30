/**
 * 组件管理服务
 */
import {WidgetGroup} from "./widget.group";
import {WidgetDescription} from "./widget.description";

export class WidgetService {

    /**
     * 通过名称查找组
     * @type {{}}
     * @private
     */
    private _name2Group = {};

    /**
     * 当前选择的分组信息
     */
    private _currentGroup: WidgetGroup;

    /**
     * 设置当前分组
     * @param {string} name 分组名称
     */
    public set currentGroup(name: string) {
        this._currentGroup = this._name2Group[name];
    }

    /**
     * 获取分组
     * @param {string} group 分组名称
     * @returns {WidgetGroup}
     */
    public getGroup(group: string = null): WidgetGroup {
        if (group === null) {
            return this._currentGroup;
        } else {
            return this._name2Group[group];
        }
    }

    /**
     * 添加分组
     * @param {string} name
     */
    public addGroup(name: string) {
        if (!this._name2Group[name]) {
            this._name2Group[name] = new WidgetGroup();
        }
    }

    /**
     * 组成组件
     * @param {WidgetDescription} widget
     * @param {string} group
     */
    public registryWidget(widget: WidgetDescription, group: string = null) {
        if (group === null && this._currentGroup !== null) {
            this._currentGroup.registryWidget(widget);
            return;
        }
        if (this._name2Group[group]) {
            this._name2Group[group].registryWidget(widget);
        }
    }

    /**
     * 初始化组件分组信息
     */
    public widgetInit() {
        this.addGroup("流程图");

        this.currentGroup = "流程图";

        this.getGroup().addType("Flowchart", "flowchart", 0);
        this.getGroup().addType("Annotations", "annotations", 1);

        this.getGroup().typeResort();
    }
}
