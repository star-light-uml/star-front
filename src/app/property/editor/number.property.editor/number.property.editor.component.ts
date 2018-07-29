import { Component, OnInit } from '@angular/core';
import {BasePropertyEditorComponent} from "../BasePropertyEditorComponent";

@Component({
  selector: 'app-number.property.editor',
  templateUrl: './number.property.editor.component.html',
  styleUrls: ['./number.property.editor.component.css']
})
export class NumberPropertyEditorComponent extends BasePropertyEditorComponent implements OnInit {

    constructor() {
        super();
    }

  ngOnInit() {
  }

}
