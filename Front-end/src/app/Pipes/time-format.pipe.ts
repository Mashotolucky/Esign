import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: any):any {

    const formatted = new Date('1970-01-01T' + value + 'Z')
    .toLocaleTimeString('en-US',
      {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
    );
   
    return formatted;
  }

}
