import { Test, TestingModule } from '@nestjs/testing';
import { HolidayService } from '../holiday.service';
import { HolidayRepositoryWithEnrico } from '../holiday.decorator';

const mockHoliday1 = {
  type: 'public_holiday',
  start_at: '2022-01-01',
  end_at: '2022-01-01',
  name: [{
    lang: 'tr',
    text: 'Yılbaşı',
  },
    {
      lang: 'en',
      text: 'New Year\'s Day',
    }],
  country_code: 'tr',
  year: '2022',
};

const mockHoliday2 = {
  type: 'public_holiday',
  start_at: '2022-04-23',
  end_at: '2022-04-23',
  name: [{
    lang: 'tr',
    text: 'Ulusal Egemenlik ve Çocuk Bayramı',
  },
    {
      lang: 'en',
      text: 'National Sovereignty and Children\'s Day',
    }],
  country_code: 'tr',
  year: '2022',
};

const mockHolidays = [mockHoliday1, mockHoliday2];

const mockHolidayRepositoryWithEnrico = () => ({
  getHolidaysOfYearByCountry: jest.fn(),
  getHolidayByDate: jest.fn(),
});

describe('HolidayService', () => {
  let holidayService: HolidayService;
  let holidayRepositoryWithEnrico;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidayService,
        {
          provide: HolidayRepositoryWithEnrico,
          useFactory: mockHolidayRepositoryWithEnrico,
        }],
    }).compile();

    holidayService = module.get(HolidayService);
    holidayRepositoryWithEnrico = module.get(HolidayRepositoryWithEnrico);
  });

  describe('getHolidaysOfYearByCountry', () => {
    it('calls holidayRepositoryWithEnrico.getHolidaysOfYearByCountry', async () => {
      expect(holidayRepositoryWithEnrico.getHolidaysOfYearByCountry).not.toHaveBeenCalled();
      holidayRepositoryWithEnrico.getHolidaysOfYearByCountry.mockResolvedValue(mockHolidays);
      const result = await holidayRepositoryWithEnrico.getHolidaysOfYearByCountry();
      expect(holidayRepositoryWithEnrico.getHolidaysOfYearByCountry).toHaveBeenCalled();
      expect(result).toEqual(mockHolidays);
    });
  });

  describe('getHolidayByDate', () => {
    it('calls holidayRepositoryWithEnrico.getHolidayByDate', async () => {
      expect(holidayRepositoryWithEnrico.getHolidayByDate).not.toHaveBeenCalled();
      holidayRepositoryWithEnrico.getHolidayByDate.mockResolvedValue(mockHoliday1);
      const result = await holidayRepositoryWithEnrico.getHolidayByDate();
      expect(holidayRepositoryWithEnrico.getHolidayByDate).toHaveBeenCalled();
      expect(result).toEqual(mockHoliday1);
    });
  });

});
