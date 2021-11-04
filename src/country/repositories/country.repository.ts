import { Repository, EntityRepository } from 'typeorm';
import { Country, ICountry } from '../entities/country.entity';

// ICountryRepository
export default interface ICountryRepository {
  IsExist(): Promise<boolean>
  createCountries(countries: Country[])
  getCountries(): Promise<ICountry[]>;
  getCountryByCode(code: string): Promise<ICountry>
}

// CountryRepository
@EntityRepository(Country)
export class CountryRepository extends Repository<Country> implements ICountryRepository {

  async IsExist(): Promise<boolean> {
    return await this.count() > 0;
  }

  createCountries(countries: Country[]) {
    return this.insert(countries);
  }

  getCountries(): Promise<ICountry[]> {
    return this.find();
  }

  getCountryByCode(code: string): Promise<ICountry> {
    return this.findOne({code})
  }
}
