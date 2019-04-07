import {AfterViewInit, Component, ViewChild, ViewContainerRef} from "@angular/core";

import {ICellEditorAngularComp} from "ag-grid-angular";

@Component({
    selector: 'editor-cell',
    template: `
        <div #container class="bool" tabindex="0" (keydown)="onKeyDown($event)">
            <div src="https://www.ag-grid.com/images/smiley.png" (click)="onClick(true)" [ngClass]="{'selected' : value, 'default' : !value}">
            <img src="https://www.ag-grid.com/images/smiley-sad.png" (click)="onClick(false)"
                 [ngClass]="{'selected' : !value, 'default' : value}">
        </div>
    `,
    styles: [`
        .bool {
            border-radius: 15px;
            border: 1px solid grey;
            background: #e6e6e6;
            padding: 15px;
            text-align: center;
            display: inline-block;
            outline: none
        }

        .default {
            padding-left: 10px;
            padding-right: 10px;
            border: 1px solid transparent;
            padding: 4px;
        }

        .selected {
            padding-left: 10px;
            padding-right: 10px;
            border: 1px solid lightgreen;
            padding: 4px;
        }
    `]
})
export class BooleanEditor implements ICellEditorAngularComp, AfterViewInit {
    private params: any;

    @ViewChild('container', {read: ViewContainerRef}) public container;
    public value: boolean = false;

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
        window.setTimeout(() => {
            this.container.element.nativeElement.focus();
        })
    }

    agInit(params: any): void {
        this.params = params;
        this.setTrue(params.value === "True");
    }

    getValue(): any {
        return this.value ? "True" : "False";
    }

    isPopup(): boolean {
        return true;
    }

    setTrue(value: boolean): void {
        this.value = value;
    }

    toggleMood(): void {
        this.setTrue(!this.value);
    }

    onClick(value: boolean) {
        this.setTrue(value);
        this.params.api.stopEditing();
    }

    onKeyDown(event): void {
        let key = event.which || event.keyCode;
        if (key == 37 ||  // left
            key == 39) {  // right
            this.toggleMood();
            event.stopPropagation();
        }
    }
}