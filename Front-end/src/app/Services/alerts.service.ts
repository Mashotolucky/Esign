import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(public snackBar: MatSnackBar) {}

  config: MatSnackBarConfig = {
    duration: 10000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  config_dagger: MatSnackBarConfig = {
    duration: 1500,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };
  config_success: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  success(msg: string): any {
    this.config_success.panelClass = 'success-snackbar';
    this.snackBar.open(msg, 'Close', this.config_success);
  }
  danger(msg: string): any {
    this.config_dagger.panelClass = 'danger-snackbar';
    this.snackBar.open(msg, 'Close', this.config_dagger);
  }
  warning(msg: string): any {
    this.config.panelClass = 'warning-snackbar';
    this.snackBar.open(msg, 'Close', this.config);
  }
}
