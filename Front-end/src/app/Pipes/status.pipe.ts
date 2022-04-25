import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any):any {

    if(value===true){
      return "Accepted";
    }
    else if(value===false){
      return "Decline";
    }
    else{
      return "Pending";
    }
   
  }

}
