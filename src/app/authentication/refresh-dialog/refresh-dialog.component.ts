import { timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'refresh-dialog',
  styleUrls: ['refresh-dialog.component.scss'],
  templateUrl: 'refresh-dialog.component.html'
})
export class RefreshDialogComponent implements OnInit {

  public countDown;
  public starterCount = 30;

  constructor(
    public dialog: MatDialogRef<RefreshDialogComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public ngOnInit(): void {
    console.log('refresh-dialog component loaded');
    this.starterCount = Math.floor(this.data.timeLeft / 1000);
    this.countDown = timer(0, 1000).pipe(
      take(this.starterCount),
      map(() =>  {
        if (this.starterCount === 1) {
          return this.onCancel();
        } else {
          return --this.starterCount;
        }
      })
    )
  }

  public onSubmit(): void {
    this.dialog.close(true);
  }

  public onCancel(): void {
    this.dialog.close(false);
  }
}
