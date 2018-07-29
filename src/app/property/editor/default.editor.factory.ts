import {NumberPropertyEditorComponent} from "./number.property.editor/number.property.editor.component";

export class DefaultEditorFactory {

    public getComponent(key: string): any {
        switch (key) {
            case "number":
                return NumberPropertyEditorComponent;
        }
        return null;
    }
}
