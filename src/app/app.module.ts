import { AppComponent } from './view/app/app.component';
import {WidgetService} from "./service/widget.service";
import {HttpService} from "./service/http.service";
import {MessageComponent} from './view/message/message.component';
import {MessageService} from "./service/message.service";
import {WidgetFactoryService} from "./service/widget.factory.service";
import {ProjectService} from "./service/project.service";
import {StatusService} from "./service/status.service";
import { WidgetListComponent } from './view/widget.list/widget.list.component';
import { WidgetShowComponent } from './view/widget.list/widget.show/widget.show.component';
import { ElementComponent } from './view/element/element.component';
import { ResizeComponent } from './view/resize/resize.component';
import { SelectViewComponent } from './view/app/select.view/select.view.component';
import { PropertyListComponent } from './view/property.list/property.list.component';
import {registerLocaleData} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import zh from '@angular/common/locales/zh';
import {FormsModule} from "@angular/forms";
import { PropertyListItemComponent } from './view/property.list/property.list.item/property.list.item.component';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        WidgetListComponent,
        WidgetShowComponent,
        ElementComponent,
        ResizeComponent,
        SelectViewComponent,
        PropertyListComponent,
        PropertyListItemComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgZorroAntdModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        HttpService,
        WidgetService,
        MessageService,
        WidgetFactoryService,
        ProjectService,
        StatusService
        ],
    bootstrap: [AppComponent]
})
export class AppModule { }
