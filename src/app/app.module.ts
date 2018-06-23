import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './view/app/app.component';
import { ElementComponent } from './view/element/element.component';


@NgModule({
    declarations: [
        AppComponent,
        ElementComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
