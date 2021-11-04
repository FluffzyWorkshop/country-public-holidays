import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import IEnricoService, { EnricoService } from '../third_parties/enrico.service';
import IHolidayRepository, { HolidayRepository } from './repositories/holiday.repository';
import { ICountry } from '../country/entities/country.entity';
import { Holiday, IHoliday } from './entities/holiday.entity';
import { HolidayName } from './entities/holiday_names.entity';
import { getFormattedDate } from '../helpers/date';

// HolidayDecorator
export default interface HolidayDecorator {
  getHolidaysOfYearByCountry(country: ICountry, year: number): Promise<IHoliday[]>

  getHolidayByDate(country: ICountry, date: Date, types: string[]): Promise<IHoliday>
}


// HolidayRepositoryWithEnrico
@Injectable()
export class HolidayRepositoryWithEnrico implements HolidayDecorator {
  constructor(
    @InjectRepository(HolidayRepository)
    private holidayRepository: IHolidayRepository,
    @Inject(EnricoService)
    private EnricoService: IEnricoService,
  ) {
  }

  //createHolidays
  private async createHolidays(country: ICountry, year: number) {
    let holidays: Holiday[];
    holidays = [];
    await this.EnricoService.getHolidaysOfYearByCountryCode(country.code, year).toPromise().then(function(item) {
      item.data.forEach(function(holiday) {
        let names: HolidayName[];
        names = [];

        holiday.name.forEach(function(name) {
          names.push(new HolidayName({
            lang: name.lang,
            text: name.text,
          }));
        });

        let h = new Holiday({
          type: holiday.holidayType,
          start_at: new Date(getFormattedDate(holiday.date.year, holiday.date.month, holiday.date.day)),
          country: country,
          year: holiday.date.year,
          name: names,
        });

        if (holiday.dateTo != null) {
          h.end_at = new Date(getFormattedDate(holiday.dateTo.year, holiday.dateTo.month, holiday.dateTo.day));
        }

        holidays.push(h);
      });
    }).catch(function(error) {
      if (error != null) {
        throw new InternalServerErrorException('Enrico api not responding');
      }
    });

    await this.holidayRepository.createHolidays(holidays);
  }

  //getHolidaysOfYearByCountry
  async getHolidaysOfYearByCountry(country: ICountry, year: number): Promise<IHoliday[]> {
    if (!await this.holidayRepository.isExist(country, year)) {
      await this.createHolidays(country, year);
    }
    return this.holidayRepository.getHolidaysOfYearByCountry(country, year);
  }

  async getHolidayByDate(country: ICountry, date: Date, types: string[]): Promise<IHoliday> {
    if (!await this.holidayRepository.isExist(country, date.getFullYear())) {
      await this.createHolidays(country, date.getFullYear());
    }
    return this.holidayRepository.getHolidayByDate(country, date, types);
  }
}
