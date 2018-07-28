import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { AppComponent } from './view/app/app.component';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {WidgetService} from "./service/widget.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpService} from "./service/http.service";
import {HttpClientModule} from "@angular/common/http";
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

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        WidgetListComponent,
        WidgetShowComponent,
        ElementComponent,
        ResizeComponent,
        SelectViewComponent
    ],
    imports: [
        BrowserModule,
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
