/**
 * 组件描述信息
 */
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
     * 组件创建方法
     */
    factory: Function;
    /**
     * 组件图标
     */
    icon: string;
    /**
     * 组件分类
     */
    group: string;
    /**
     * 组件类型
     */
    type: string;
    /**
     * 排序值，小的排前面
     */
    sort: number;
}
