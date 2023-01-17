import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

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

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue(JSON.stringify(this.text, null, 2));
    aceEditor.session.setMode('ace/mode/json');
    aceEditor.setReadOnly(true);
    // aceEditor.setTheme('ace/theme/twilight');
    // aceEditor.on('change', () => {
    //   console.log(aceEditor.getValue());
    // });
  }
}
