import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any):any {

    if(value===true){
      return "completed";
    }
    else{
      return "pending";
    }
   
  }

}
