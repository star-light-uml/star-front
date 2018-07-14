export class Widget {
    /**
     * 子组件
     * @type {Array}
     * @private
     */
    private _children: Widget [] = [];

    private _parent: Widget;

    private _selectable = true;
}
