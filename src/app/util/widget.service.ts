/**
 * 组件管理服务
 */
import {WidgetGroup} from "./widget.group";
import {WidgetDescription} from "./widget.description";
import {ProcessWidget} from "../widget/process.widget";
import {TerminatorWidget} from "../widget/terminator.widget";

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
        const group = this.getGroup("流程图");
        group.addType("Flowchart", "flowchart", 0);
        group.addType("Annotations", "annotations", 1);
        group.registryWidget({
            name: "Process",
            key: "process",
            icon: "",
            type: "flowchart",
            sort: 0,
            factory: () => new ProcessWidget(),
            defaultWidget: new ProcessWidget()
        });
        group.registryWidget({
            name: "Terminator",
            key: "terminator",
            icon: "",
            type: "flowchart",
            sort: 1,
            factory: () => new TerminatorWidget(),
            defaultWidget: new TerminatorWidget()
        });
        this.getGroup().typeResort();
    }
}
