import { Module } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { HolidayController } from './holiday.controller';
import { HolidayDecoratorModule } from './holiday.decorator.module';
import { CountryModule } from '../country/country.module';

@Module({
  imports: [HolidayDecoratorModule, CountryModule],
  controllers: [HolidayController],
  providers: [HolidayService],
})
export class HolidayModule {
}
