import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AceEditorComponent } from './ace-editor/ace-editor.component';
import { DialogCardCompagnonComponent } from './dialog-card-compagnon/dialog-card-compagnon.component';
import { DialogCardEquipementComponent } from './dialog-card-equipement/dialog-card-equipement.component';
import { DialogCardSortComponent } from './dialog-card-sort/dialog-card-sort.component';
import { DialogCompagnonComponent } from './dialog-compagnon/dialog-compagnon.component';
import { DialogEquipementComponent } from './dialog-equipement/dialog-equipement.component';
import { DialogSortComponent } from './dialog-sort/dialog-sort.component';
import { TableCardCompagnonComponent } from './table-card-compagnon/table-card-compagnon.component';
import { TableCardEquipementComponent } from './table-card-equipement/table-card-equipement.component';
import { TableCardSortComponent } from './table-card-sort/table-card-sort.component';
import { TableCompagnonComponent } from './table-compagnon/table-compagnon.component';
import { TableEquipementComponent } from './table-equipement/table-equipement.component';
import { TableSortComponent } from './table-sort/table-sort.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AceEditorComponent,
    DialogCardCompagnonComponent,
    DialogCardEquipementComponent,
    DialogCardSortComponent,
    DialogCompagnonComponent,
    DialogEquipementComponent,
    DialogSortComponent,
    TableCardCompagnonComponent,
    TableCardEquipementComponent,
    TableCardSortComponent,
    TableCompagnonComponent,
    TableEquipementComponent,
    TableSortComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
