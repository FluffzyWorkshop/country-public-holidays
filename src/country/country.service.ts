import { Inject, Injectable } from '@nestjs/common';
import { CountryRepositoryWithEnrico } from './country.decorator';
import CountryDecorator from './country.decorator';
import { ICountry } from './entities/country.entity';
import ICountryRepository, { CountryRepository } from './repositories/country.repository';

// ICountryService
export default interface ICountryService {
  index(): Promise<ICountry[]>
  getCountryByCode(code: string): Promise<ICountry>
}

// CountryService
@Injectable()
export class CountryService implements ICountryService{
  constructor(
    @Inject(CountryRepository)
    private countryRepository: ICountryRepository,
    @Inject(CountryRepositoryWithEnrico)
    private countryDecorator: CountryDecorator
  ) {
  }

  index(): Promise<ICountry[]> {
    return this.countryDecorator.getCountries();
  }

  getCountryByCode(code: string): Promise<ICountry> {
    return this.countryRepository.getCountryByCode(code)
  }
}
