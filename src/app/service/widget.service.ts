import {WidgetGroup} from "../util/widget.group";
import {WidgetDescription} from "../util/widget.description";
import {HttpService} from "./http.service";
import {Injectable} from "@angular/core";
import {WidgetFactoryService} from "./widget.factory.service";
import {DefaultWidgetFactory} from "../widget.factory/default.widget.factory";

/**
 * 组件管理服务
 */
@Injectable()
export class WidgetService {

    constructor(public httpService: HttpService, public widgetFactoryService: WidgetFactoryService) {}

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
        this.widgetFactoryService.addFactory(new DefaultWidgetFactory());
        this.httpService.httpGet("/assets/widgets.json", (result) => {
            result.forEach((g) => {
                this.addGroup(g.group);
                if (g.current) {
                    this.currentGroup = g.group;
                }
                const group = this.getGroup(g.group);
                g.types.forEach((t) => {
                    group.addType(t.name, t.type, t.value);
                    t.widgets.forEach((w) => {
                        group.registryWidget({
                            name: w.name,
                            key: w.key,
                            icon: w.icon,
                            sort: w.value,
                            defaultWidget: this.widgetFactoryService.createWidget(w.key),
                            type: t.type
                        });
                    });
                });
            });
        });
    }
}
