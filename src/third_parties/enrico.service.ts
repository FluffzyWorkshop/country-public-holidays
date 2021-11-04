import { Injectable } from '@nestjs/common';
import { HttpService, HttpModule } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { IEnricoCountry } from './entities/country';
import { IEnricoHoliday } from './entities/holiday';

// IEnricoService
export default interface IEnricoService {
  getCountries(): Observable<AxiosResponse<IEnricoCountry[]>>;
  getHolidaysOfYearByCountryCode(code: string, year: number): Observable<AxiosResponse<IEnricoHoliday[]>>
}

// EnricoService
@Injectable()
export class EnricoService implements IEnricoService{
  constructor(private httpService: HttpService) {
  }

  getCountries(): Observable<AxiosResponse<IEnricoCountry[]>> {
    return this.httpService.get(`https://kayaposoft.com/enrico/json/v2.0/?action=getSupportedCountries`);
  }

  getHolidaysOfYearByCountryCode(code: string, year: number): Observable<AxiosResponse<IEnricoHoliday[]>> {
    return this.httpService.get(`https://kayaposoft.com/enrico/json/v2.0/?action=getHolidaysForYear&year=${year}&country=${code}`);
  }
}
