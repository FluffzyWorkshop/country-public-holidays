import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from '../country.service';
import { CountryRepositoryWithEnrico } from '../country.decorator';
import { CountryRepository } from '../repositories/country.repository';

const mockCountry1 = {
  code: 'tur',
  full_name: 'Turkey',
};

const mockCountry2 = {
  code: 'ago',
  full_name: 'Angola',
};

const mockCountries = [mockCountry1, mockCountry2];

const mockCountryRepositoryWithEnrico = () => ({
  getCountries: jest.fn(),
});

const mockCountryRepository = () => ({
  isExist: jest.fn(),
  getCountryByCode: jest.fn(),
  getCountries: jest.fn(),
});

describe('CountryService', () => {
  let countryService: CountryService;
  let countryRepository;
  let countryRepositoryWithEnrico;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryService,
        { provide: CountryRepository, useFactory: mockCountryRepository }, {
          provide: CountryRepositoryWithEnrico,
          useFactory: mockCountryRepositoryWithEnrico,
        }],
    }).compile();

    countryService = module.get(CountryService);
    countryRepository = module.get(CountryRepository);
    countryRepositoryWithEnrico = module.get(CountryRepositoryWithEnrico);
  });

  describe('getCountries', () => {
    it('calls countryRepositoryWithEnrico.getCountries', async () => {
      expect(countryRepositoryWithEnrico.getCountries).not.toHaveBeenCalled();
      countryRepositoryWithEnrico.getCountries.mockResolvedValue(mockCountries);
      const result = await countryRepositoryWithEnrico.getCountries();
      expect(countryRepositoryWithEnrico.getCountries).toHaveBeenCalled();
      expect(result).toEqual(mockCountries);
    });
  });

  describe('getCountryByCode', () => {
    it('calls countryRepository.getCountryByCode', async () => {
      expect(countryRepository.getCountryByCode).not.toHaveBeenCalled();
      countryRepository.getCountryByCode.mockResolvedValue(mockCountry1);
      const result = await countryRepository.getCountryByCode();
      expect(countryRepository.getCountryByCode).toHaveBeenCalled();
      expect(result).toEqual(mockCountry1);
    });
  });
});
