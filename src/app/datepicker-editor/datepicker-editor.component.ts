import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ICellEditorParams} from 'ag-grid-community';
import {AgEditorComponent} from 'ag-grid-angular';
import {MatDatepicker} from '@angular/material';

@Component({
    selector: 'app-ag-grid-material-datepicker-editor',
    template: `
        <mat-form-field>
            <input matInput [matDatepicker]="picker" [(ngModel)]="value">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        </mat-form-field>
        <mat-datepicker panelClass="ag-custom-component-popup" #picker (selectedChanged)="onSelectChange(e)"></mat-datepicker>
    `,
    styles: [
            `
            .md-form-field {
                margin-top: -16px;
            }
        `
    ]
})
export class DatepickerEditor implements OnInit, AgEditorComponent, AfterViewInit {
    columnWidth: string;
    params: ICellEditorParams;
    private value: string;
    @ViewChild('picker', {read: MatDatepicker}) picker: MatDatepicker<Date>;

    constructor() {
    }
    
    ngOnInit() {
    }

    ngAfterViewInit() {
        this.picker.open();
    }

    isPopup(): boolean {
        return false;
    }

    isCancelBeforeStart(): boolean {
        return false;
    }

    isCancelAfterEnd(): boolean {
        return false;
    }

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
    }

    getValue(): string {
        return this.value;
    }

    onSelectChange(e): void {
        setTimeout(function () {
            this.params.stopEditing();
        }.bind(this));
    }

}