import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from '../country.service';

class EnricoServiceMock {
  getCountries() {
    return [{
      code: 'tur',
      full_name: 'Turkey',
    }, {
      code: 'ago',
      full_name: 'Angola',
    }];
  }
}

describe('CountryService', () => {
  let service: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryService],
    }).compile();

    service = module.get<CountryService>(CountryService);
  });

  it('getCountries', () => {
    expect(service.index()).toBeDefined();
  });
});
