import {Component} from '@angular/core';
import {BackgroundView} from "../../widget/background.view";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    background = new BackgroundView();

    constructor() {
    }
}
