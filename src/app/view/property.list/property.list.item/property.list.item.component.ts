import {Component, ComponentFactoryResolver, DoCheck, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Property} from "../../../property/property";
import {PropertyEditorService} from "../../../property/editor/property.editor.service";
import {StatusService} from "../../../service/status.service";

@Component({
    selector: 'app-property-list-item',
    templateUrl: './property.list.item.component.html',
    styleUrls: ['./property.list.item.component.css']
})
export class PropertyListItemComponent implements OnInit, DoCheck {
    @Input("property") property: Property;
    @Input("level") level = 0;
    @Input("even") even = false;
    extend = false;
    private componentRef = null;
    @ViewChild("editor", { read: ViewContainerRef }) container: ViewContainerRef;

    backgroundColorList = [
        {
            light: "#fff2de",
            dark: "#ffe6bf"
        },
        {
            light: "#ffffde",
            dark: "#ffffbf",
        },
        {
            light: "#deffde",
            dark: "#bfffbf"
        }
    ];

    constructor(private resolver: ComponentFactoryResolver, private editorFactory: PropertyEditorService,
                private statusService: StatusService) { }

    ngOnInit() {
    }

    getRowStyle() {
        const t = this.level % 3;
        return {
            "background": this.even ? this.backgroundColorList[t].dark : this.backgroundColorList[t].light
        };
    }

    click(event) {
        this.statusService.editingProperty = null;
        if (!this.property.editable) {
            return;
        }
        this.container.clear();
        const type = this.editorFactory.getComponent(this.property.editorKey);
        if (type === null) {
            return;
        }
        const factory =
            this.resolver.resolveComponentFactory(type);
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.property = this.property;
        this.statusService.editingProperty = this.property;
        event.cancelBubble = true;
    }

    ngDoCheck() {
        if (this.container && this.componentRef) {
            if (!this.property.editable || this.statusService.editingProperty !== this.property) {
                this.container.clear();
                this.componentRef = null;
            }
        }
    }
}
