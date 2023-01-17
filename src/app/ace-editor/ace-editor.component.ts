import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import * as ace from 'ace-builds';
import { Equipements } from '../struct';

@Component({
  selector: 'app-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.css'],
})
export class AceEditorComponent implements AfterViewInit {
  @ViewChild('editor') private editor!: ElementRef<HTMLElement>;
  @Input() text!: Equipements;

  aceEditor!: ace.Ace.Editor;

  loadData(): void {
    this.aceEditor.session.setValue(JSON.stringify({ equipements: this.text }, null, 2));
  }

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setMode('ace/mode/json');
    this.aceEditor.setReadOnly(true);
    this.aceEditor.setShowPrintMargin(false);
    this.loadData();
  }
}
