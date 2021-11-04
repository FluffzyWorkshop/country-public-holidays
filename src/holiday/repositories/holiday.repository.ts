import { EntityRepository, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Holiday, IHoliday } from '../entities/holiday.entity';
import { ICountry } from '../../country/entities/country.entity';
import { getFormattedDate } from '../../helpers/date';

// IHolidayRepository
export default interface IHolidayRepository {
  isExist(country: ICountry, year: number): Promise<boolean>

  createHolidays(holidays: IHoliday[])

  getHolidaysOfYearByCountry(country: ICountry, year: number): Promise<IHoliday[]>

  getHolidayByDate(country: ICountry, date: Date, types: string[]): Promise<IHoliday>
}

// HolidayRepository
@EntityRepository(Holiday)
export class HolidayRepository extends Repository<Holiday> implements IHolidayRepository {

  async isExist(country: ICountry, year: number): Promise<boolean> {
    return await this.count({ year: year, country: country }) > 0;
  }

  createHolidays(holidays: IHoliday[]) {
    return this.save(holidays);
  }

  getHolidaysOfYearByCountry(country: ICountry, year: number): Promise<IHoliday[]> {
    return this.find({ year: year, country: country });
  }

  getHolidayByDate(country: ICountry, date: Date, types: string[]): Promise<IHoliday> {
    return this.findOne({
      year: date.getFullYear(),
      country: country,
      start_at: LessThanOrEqual(date.toLocaleDateString('sv-SE')),
      end_at: MoreThanOrEqual(date.toLocaleDateString('sv-SE')),
    });
  }

}
