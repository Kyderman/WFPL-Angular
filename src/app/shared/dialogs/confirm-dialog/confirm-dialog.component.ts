import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  styleUrls: ['confirm-dialog.component.scss'],
  templateUrl: 'confirm-dialog.component.html'
})
export class ConfirmDialogComponent implements OnInit {

  public message: string;
  public isOK: Boolean = false;
  public resultEmitter = new EventEmitter();

  constructor(public dialog: MatDialog ) {
  }

  public ngOnInit(): void {
    console.log('confirm-dialog component loaded');
  }

  public returnResult(result: boolean): void {
    this.resultEmitter.emit(result);
    this.dialog.closeAll();
  }

}
