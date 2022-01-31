import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }
   
  showSuccess(message:string, title:string, timeOut:number=-1)
  {
    if(timeOut==-1)
      this.toastr.success(message, title)
    else
      this.toastr.success(message, title, {timeOut:timeOut})
      
  }
   
  showError(message:string, title:string, timeOut:number=-1)
  {
    if(timeOut==undefined)
      this.toastr.error(message, title)
    else
      this.toastr.error(message, title, {timeOut:timeOut})
      
  }
   
  showInfo(message:string, title:string, timeOut:number=-1)
  {
    if(timeOut==undefined)
      this.toastr.info(message, title)
    else
    this.toastr.info(message, title, {timeOut:timeOut})
  }
   
  showWarning(message:string, title:string, timeOut:number=-1)
  {
    if(timeOut==undefined)
      this.toastr.warning(message, title)
    else
      this.toastr.warning(message, title, {timeOut:timeOut})
  }

  clear()
  {
    this.toastr.clear();
  }
}
