import { Controller, Get} from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Holiday } from '../holiday/entities/holiday.entity';
import { Country } from './entities/country.entity';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiTags('countries')
  @ApiResponse({
    type: Country,
    isArray: true,
    description: 'Holidays of a year grouped by month',
  })


  index() {
    return this.countryService.index();
  }
}
