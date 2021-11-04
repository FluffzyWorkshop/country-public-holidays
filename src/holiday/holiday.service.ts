import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import HolidayDecorator, { HolidayRepositoryWithEnrico } from './holiday.decorator';
import { ICountry } from '../country/entities/country.entity';
import { IHoliday } from './entities/holiday.entity';
import { dateRange, weekendCalculator, getFormattedDate, getMonths, isWeekend } from '../helpers/date';

// IHolidayService
export default interface IHolidayService {
  index(): Promise<IHoliday[]>

  getDateStatus(country: ICountry, date: Date): Promise<Map<string, string>>

  getFreeDaysCount(country: ICountry, year: number): Promise<Map<string, string>>
}

@Injectable()
export class HolidayService {
  constructor(
    @Inject(HolidayRepositoryWithEnrico)
    private holidayDecorator: HolidayDecorator,
  ) {
  }

  async index(country: ICountry, year: number): Promise<Map<string, IHoliday[]>> {
    let holidays = await this.holidayDecorator.getHolidaysOfYearByCountry(country, year);
    let holidaysMap = new Map<string, IHoliday[]>();

    getMonths().forEach(function(month) {
      holidaysMap[month] = [];
    });

    holidays.forEach(function(item) {
      let month = new Date(item.start_at).toLocaleString('en-US', { month: 'long' }).toLowerCase();
      holidaysMap[month] = holidaysMap[month] || [];
      holidaysMap[month].push(item);
    });

    return holidaysMap;
  }

  async getDateStatus(country: ICountry, date: Date): Promise<Map<string, string>> {
    let status = new Map<string, string>();
    let holiday = await this.holidayDecorator.getHolidayByDate(country, date, ['public_holiday', 'postal_holiday']);

    if (holiday) {
      status['status'] = 'holiday';
      return status;
    }

    if (isWeekend(date)) {
      status['status'] = 'free_day';
    } else {
      status['status'] = 'workday';
    }

    return status;
  }

  async getFreeDaysCount(country: ICountry, year: number): Promise<Map<string, number>> {
    let status = new Map<string, number>();

    let holidays = await this.holidayDecorator.getHolidaysOfYearByCountry(country, year);

    let days = [];
    holidays.forEach(function(item) {
      dateRange(new Date(item.start_at), new Date(item.end_at)).forEach(function(date) {
        if (!isWeekend(new Date(date))) {
          if (!days.includes(date.toISOString())) {
            days.push(date.toISOString());
          }
        }
      });
    });

    let count = await weekendCalculator(new Date(getFormattedDate(year, 1, 1)), new Date(getFormattedDate(year, 12, 31)));
    status['count'] = Number(days.length) + count;
    return status;
  }
}
