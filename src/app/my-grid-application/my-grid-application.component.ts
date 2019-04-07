import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { RedComponentComponent } from "../red-component/red-component.component";
import { ConfigService } from '../services/config.service';
import { ModalService } from '../services/model.service';
import { GridCellEditorComponent } from "../grid-cell-editor/grid-cell-editor.component";
import { NumericEditor } from "../numeric-editor/numeric-editor.component";
import { BooleanEditor } from "../boolean-editor/boolean-editor.component";
import {DatepickerEditor} from "../datepicker-editor/datepicker-editor.component";
import * as moment from 'moment';


@Component({
    selector: 'app-my-grid-application',
    templateUrl: './my-grid-application.component.html',
    styleUrls: ['./my-grid-application.component.css'],
})
export class MyGridApplicationComponent implements OnInit {

    private gridOptions: GridOptions;

    private gridApi;
    private gridColumnApi;

    private columnDefs;
    private defaultColDef;
    private groupDefaultExpanded;
    private rowData: [];

    private frameworkComponents;

    ngOnInit() {
    }


    constructor(private configService: ConfigService, private modalService: ModalService) {
      this.showInitData();
      this.gridOptions = <GridOptions>{};

      this.gridOptions.defaultColDef = {
        // set every column width
        width: 150,
        // make every column editable
        editable: true,
        // make every column sortable
        sortable: true,
        // make every column use 'text' filter by default
        filter: 'agTextColumnFilter',
        //cell editor lookup
        cellEditor: 'gridCellEditorComponent',
        cellRendererFramework: RedComponentComponent
    }
    
    this.navigateToNextCell = this.navigateToNextCell.bind(this);
    this.tabToNextCell = this.tabToNextCell.bind(this);
    this.frameworkComponents = {
      gridCellEditorComponent: GridCellEditorComponent,
      booleanEditor: BooleanEditor,
      numericEditor: NumericEditor,
      datePicker: this.getDatePicker()
    };
 }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.showInitData();

    }

    onCellClicked($event){
    console.log($event);
    window.alert($event.data.description +" is clicked")
  //  this.modalService.open("custom-modal-1");
}

    showInitData() {
        this.configService.getConfig().subscribe(result => {
            this.rowData = result.gridData;
            this.gridOptions.api.setColumnDefs(this.generateColumns(this.rowData))
            this.gridOptions.api.setRowData(this.rowData)
        }, error => console.error(error));
    };

    

   tabToNextCell(params) {
    let previousCell = params.previousCellDef;
    let lastRowIndex = previousCell.rowIndex;
    let nextRowIndex = params.backwards ? lastRowIndex + 1 : lastRowIndex - 1;
    let renderedRowCount = this.gridApi.getModel().getRowCount();
    if (nextRowIndex < 0) {
      nextRowIndex = 0;
    }
    if (nextRowIndex >= renderedRowCount) {
      nextRowIndex = renderedRowCount - 1;
    }
    let result = {
      rowIndex: nextRowIndex,
      column: previousCell.column,
      floating: previousCell.floating
    };
    return result;
  }

  navigateToNextCell(params) {
    let previousCell = params.previousCellDef;
    let suggestedNextCell = params.nextCellDef;
    switch (params.key) {
      case 38:
        var nextRowIndex = previousCell.rowIndex - 1;
        if (nextRowIndex < 0) {
          return null;
        } else {
          return {
            rowIndex: nextRowIndex,
            column: previousCell.column,
            floating: previousCell.floating
          };
        }
      case 40:
        var nextRowIndex : number = previousCell.rowIndex + 1;
        var renderedRowCount = this.gridApi.getModel().getRowCount();
        if (nextRowIndex >= renderedRowCount) {
          return null;
        } else {
          return {
            rowIndex: nextRowIndex,
            column: previousCell.column,
            floating: previousCell.floating
          };
        }
      case 37:
      case 39:
        return suggestedNextCell;
      default:
        throw "this will never happen, navigation is always one of the 4 keys above";
    }
  }

  generateColumns(data: any[]) {
    let columnDefinitions = [];
    let editor = '';
    let cellEditorFramework ;
    let valueFormatter ;
    let parameters = {};

    data.map(object => {

      Object
        .keys(object)
        .map(key => {
        switch(key){
          case 'condition':
            editor = "agSelectCellEditor";
            parameters = { 
              values: ["true", "false"]
            }
          break; 
          
          case 'startDate':
          cellEditorFramework= DatepickerEditor,
          valueFormatter = (data) => data.value ? moment(data.value).format('L') : null  
           break;
        }
    
          let mappedColumn = {
            headerName: key.toUpperCase(),
            field: key,
            cellEditor: editor,
            cellEditorParams: parameters,
            valueFormatter: valueFormatter,
            cellEditorFramework: cellEditorFramework
          }

          columnDefinitions.push(mappedColumn);
          editor = "";
          parameters = {};
        })
    })
    //Remove duplicate columns
    columnDefinitions = columnDefinitions.filter((column, index, self) =>
      index === self.findIndex((colAtIndex) => (
        colAtIndex.field === column.field
      ))
    )
    return columnDefinitions;
  }

   getDatePicker() {
    function Datepicker() {}
    Datepicker.prototype.init = function(params) {
      this.eInput = document.createElement("input");
      this.eInput.value = params.value;
      (this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
    };
    Datepicker.prototype.getGui = function() {
      return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function() {
      this.eInput.focus();
      this.eInput.select();
    };
    Datepicker.prototype.getValue = function() {
      return this.eInput.value;
    };
    Datepicker.prototype.destroy = function() {};
    Datepicker.prototype.isPopup = function() {
      return false;
    };
    return Datepicker;
  }
}
