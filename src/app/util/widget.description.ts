/**
 * 组件描述信息
 */
import {Widget} from "../widget/widget";

export interface WidgetDescription {
    /**
     * 组件名称
     */
    name: string;
    /**
     * 组件唯一标识符
     */
    key: string;
    /**
     * 组件图标
     */
    icon: string;
    /**
     * 组件类型
     */
    type: string;
    /**
     * 排序值，小的排前面
     */
    sort: number;

    /**
     * 默认组件
     */
    defaultWidget: Widget;
}
