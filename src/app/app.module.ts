import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {AgGridModule} from "ag-grid-angular";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';
import { RedComponentComponent } from './red-component/red-component.component';
import { UiModule } from './ui/ui.module';
import { ModelComponent } from './directives/model.component';
import { ModalService } from './services/model.service';
import { GridCellEditorComponent } from './grid-cell-editor/grid-cell-editor.component';
import { NumericEditor } from './numeric-editor/numeric-editor.component';
import { BooleanEditor } from './boolean-editor/boolean-editor.component';
import { DatepickerEditor } from './datepicker-editor/datepicker-editor.component';
import { MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MyGridApplicationComponent,
    RedComponentComponent,
    ModelComponent,
    GridCellEditorComponent,
    NumericEditor,
    BooleanEditor,
    DatepickerEditor
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
     AgGridModule.withComponents(
      [RedComponentComponent, GridCellEditorComponent, NumericEditor, BooleanEditor, DatepickerEditor]
     ),
    AppRoutingModule,
    UiModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
