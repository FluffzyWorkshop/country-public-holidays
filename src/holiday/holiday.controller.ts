import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { IndexHolidayDto } from './dto/index-holiday.dto';
import { CountryService } from '../country/country.service';
import { StatusHolidayDto } from './dto/status-holiday.dto';
import { freeDaysHolidayDto } from './dto/free-days-holiday.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Holiday, IHoliday } from './entities/holiday.entity';

@Controller('holidays')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService, private readonly countryService: CountryService) {
  }

  @Get()
  @ApiTags('holidays')
  @ApiQuery({ name: 'country_code', required: true })
  @ApiQuery({ name: 'year', required: true })
  @ApiResponse({
    type: Holiday,
    isArray: true,
    description: 'Holidays of a year grouped by month',
  })
  async index(@Query() indexHolidayDto: IndexHolidayDto) {
    const country = await this.countryService.getCountryByCode(indexHolidayDto.country_code);
    if (!country) throw new NotFoundException('country not found');
    return this.holidayService.index(country, indexHolidayDto.year);
  }

  @Get('/status')
  @ApiTags('holidays')
  @ApiQuery({ name: 'country_code', required: true })
  @ApiQuery({ name: 'date', required: true, type: Date })
  @ApiResponse({
    type: Map,
    description: 'Status of the given day (workday, free_day, holiday)',
  })
  async status(@Query() statusHoliday: StatusHolidayDto) {
    const country = await this.countryService.getCountryByCode(statusHoliday.country_code);
    if (!country) throw new NotFoundException('country not found');
    return this.holidayService.getDateStatus(country, new Date(statusHoliday.date));
  }

  @Get('/free-days-count')
  @ApiTags('holidays')
  @ApiQuery({ name: 'country_code', required: true })
  @ApiQuery({ name: 'year', required: true })
  @ApiResponse({
    type: Map,
    description: 'total number of free days in the given year',
  })
  async freeDays(@Query() freeDaysHolidayDto: freeDaysHolidayDto) {
    const country = await this.countryService.getCountryByCode(freeDaysHolidayDto.country_code);
    if (!country) throw new NotFoundException('country not found');
    return this.holidayService.getFreeDaysCount(country, freeDaysHolidayDto.year);
  }
}
