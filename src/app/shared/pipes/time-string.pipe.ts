import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'time'})
export class TimeStringPipe implements PipeTransform {
  transform(totalMinutes: number): string {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    let hourString = '';
    let minuteString = '';

    if (hours > 0) {
      hourString = `${hours}h`;
    }

    if (minutes > 0) {
      minuteString = ` ${minutes}m`;
    }

    return hourString + minuteString;
  }
}
