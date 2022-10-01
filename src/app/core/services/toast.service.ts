import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast: NgToastService
  ) { }

  success(title: string, message: string, duration = 2000) {
    this.toast.success({
      detail: title,
      summary: message,
      duration
    });
  }

  showError(title: string, message: string, duration = 2000) {
    this.toast.error({ 
      detail: title, 
      summary: message, 
      duration 
    });
  }

  showInfo(title: string, message: string, duration = 2000) {
    this.toast.info({ 
      detail: title, 
      summary: message, 
      duration
    });
  }

  showWarn(title: string, message: string, duration = 2000) {
    this.toast.warning({ 
      detail: title, 
      summary: message, 
      duration
    });
  }
}
