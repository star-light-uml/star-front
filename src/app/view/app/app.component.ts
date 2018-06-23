import {Component} from '@angular/core';
import {Widget} from "../../widget/widget";
import {Property} from "../../util/property";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    background = new Widget();

    constructor() {
        const pro = new Property();
        pro.name = "width";
        pro.value = 200;
        this.background.addProperty(pro);
    }
}
