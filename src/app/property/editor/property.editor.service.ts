import {Injectable} from "@angular/core";
import {DefaultEditorFactory} from "./default.editor.factory";

@Injectable()
export class PropertyEditorService {
    private defaultFactory = new DefaultEditorFactory();

    private factory: DefaultEditorFactory [] = [];

    public addFactory(f: DefaultEditorFactory) {
        this.factory.push(f);
    }

    public getComponent(key: string): any {
        let result = null;

        for (let i = 0; i < this.factory.length; i++) {
            result = this.factory[i].getComponent(key);
            if (result != null) {
                return result;
            }
        }

        return this.defaultFactory.getComponent(key);
    }
}
