import {Injectable} from "@angular/core";
import {BackgroundView} from "../widget/background.view";

@Injectable()
export class ProjectService {
    private _background: BackgroundView = new BackgroundView();

    get background(): BackgroundView {
        return this._background;
    }
}
