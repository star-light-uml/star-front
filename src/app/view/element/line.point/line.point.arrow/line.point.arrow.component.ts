import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

@Component({
    selector: 'app-line-point-arrow',
    templateUrl: './line.point.arrow.component.html',
    styleUrls: ['./line.point.arrow.component.css']
})
export class LinePointArrowComponent implements OnInit, OnChanges, AfterViewInit {

    width = 35;
    height = 35;
    x = 0;
    y = 0;

    @Input("type") type: string;
    @ViewChild("canvas") canvas: ElementRef;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const context = this.canvas.nativeElement.getContext("2d");
        context.save();

        context.lineWidth = 3;

        if (this.type === 'r') {
            context.moveTo(4, this.height / 2 + 1);
            context.lineTo(this.width - 15, this.height / 2 + 1);
        } else if (this.type === 'l') {
            context.moveTo(15, this.height / 2 + 1);
            context.lineTo(this.width - 4, this.height / 2 + 1);
        } else if (this.type === 't') {
            context.moveTo(this.width / 2, 15);
            context.lineTo( this.width / 2, this.height - 4);
        } else if (this.type === 'b') {
            context.moveTo(this.width / 2, 4);
            context.lineTo( this.width / 2, this.height - 15);
        }
        context.stroke();
        context.beginPath();

        context.lineWidth = 1;
        if (this.type === 'r') {
            context.moveTo(this.width - 15, this.height / 2 - 6);
            context.lineTo(this.width - 2, this.height / 2 + 1);
            context.lineTo(this.width - 15, this.height / 2 + 7);
            context.lineTo(this.width - 15, this.height / 2 - 6);
        } else if (this.type === 'l') {
            context.moveTo(15, this.height / 2 - 6);
            context.lineTo(2, this.height / 2 + 1);
            context.lineTo(15, this.height / 2 + 7);
            context.lineTo(15, this.height / 2 - 6);
        } else if (this.type === 't') {
            context.moveTo(this.width / 2 - 7, 15);
            context.lineTo(this.width / 2 , 2);
            context.lineTo(this.width / 2 + 7, 15);
            context.lineTo(this.width / 2 - 7, 15);
        } else if (this.type === 'b') {
            context.moveTo(this.width / 2 - 7, this.height - 15);
            context.lineTo(this.width / 2 , this.height - 2);
            context.lineTo(this.width / 2 + 7, this.height - 15);
            context.lineTo(this.width / 2 - 7, this.height - 15);
        }
        context.fill();
        context.closePath();
        context.restore();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["type"]) {
            this.typeChange();
        }
    }

    typeChange() {
        switch (this.type) {
            case 'l':
                this.x = -47;
                this.y = -25;
                this.width = 40;
                this.height = 20;
                break;
            case 'r':
                this.x = 10;
                this.y = -25;
                this.width = 40;
                this.height = 20;
                break;
            case 't':
                this.x = 10;
                this.y = -45;
                this.width = 20;
                this.height = 40;
                break;
            case 'b':
                this.x = 10;
                this.y = 8;
                this.width = 20;
                this.height = 40;
                break;
        }
    }
}
