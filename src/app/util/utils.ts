/**
 * 一些工具方法
 */
import {Point} from "../base/point";

export class Utils {
    /**
     * 从事件中计算具体元素中的位置
     * @param {any} event
     * @param {string} id
     * @returns {Point}
     */
    public static getPosition(event: any , id: string): Point {
        const result = new Point();

        for (let i = 0; i < event.path.length; i++) {
            if (event.path[i].id === id) {
                result.x += event.layerX;
                result.y += event.layerY;
                return result;
            }
            result.x += event.path[i].offsetLeft;
            result.y += event.path[i].offsetTop;
        }

        return new Point(event.layerX, event.layerY);
    }

    public static getUuid(): string {
        let d = new Date().getTime();
        const uuid = 'xxxxxxxxxxxx'.replace(/[x]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return r.toString(16);
        });
        return uuid;
    }
}
