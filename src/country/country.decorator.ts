import { InjectRepository } from '@nestjs/typeorm';
import ICountryRepository, { CountryRepository } from './repositories/country.repository';
import { Country, ICountry } from './entities/country.entity';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import IEnricoService, { EnricoService } from '../third_parties/enrico.service';

// CountryDecorator
export default interface CountryDecorator {
  getCountries(): Promise<Country[]>;
}

// CountryRepositoryWithEnrico
@Injectable()
export class CountryRepositoryWithEnrico implements CountryDecorator {
  constructor(
    @InjectRepository(CountryRepository)
    private countryRepository: ICountryRepository,
    @Inject(EnricoService)
    private EnricoService: IEnricoService,
  ) {
  }

  private async createCountries() {
    let countries: Country[];
    countries = [];

    await this.EnricoService.getCountries().toPromise().then(function(item) {
      item.data.forEach(function(country) {
        countries.push({
          code: country.countryCode,
          full_name: country.fullName,
        });
      });
    }).catch(function(error) {
      if (error != null) {
        throw new InternalServerErrorException('Enrico api not responding');
      }
    });

    await this.countryRepository.createCountries(countries);
  }

  async getCountries(): Promise<Country[]> {
    if (!await this.countryRepository.IsExist()) {
      await this.createCountries();
    }
    return this.countryRepository.getCountries();
  }
}
