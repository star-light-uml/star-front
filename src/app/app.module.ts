import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { AppComponent } from './view/app/app.component';
import { ElementComponent } from './view/element/element.component';
import { WidgetListComponent } from './view/widget-list/widget-list.component';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {WidgetService} from "./util/widget.service";
registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        ElementComponent,
        WidgetListComponent
    ],
    imports: [
        BrowserModule,
        NgZorroAntdModule
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        WidgetService
        ],
    bootstrap: [AppComponent]
})
export class AppModule { }
