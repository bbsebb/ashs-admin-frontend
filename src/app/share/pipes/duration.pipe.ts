import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {

  // Fonction qui formate une chaîne "HH:mm:ss" en "HHhMM"
  private formatTime(timeString: string): string {
    const [hour, minute] = timeString.split(':').map(Number);
    return `${hour.toString().padStart(2, '0')}h${minute.toString().padStart(2, '0')}`;
  }

  // Calcul de la différence entre deux chaînes "HH:mm:ss"
  private calculateDuration(startTime: string, endTime: string): string {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    const diffMinutes = endTotalMinutes - startTotalMinutes;

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  }

  transform(startTime: string, endTime: string): string {
    const duration = this.calculateDuration(startTime, endTime);
    const formattedStart = this.formatTime(startTime);
    const formattedEnd = this.formatTime(endTime);

    return `${duration}`;
  }
}
