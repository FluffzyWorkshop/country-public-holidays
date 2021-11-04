import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnricoModule } from '../third_parties/enrico.module';
import { HolidayRepository } from './repositories/holiday.repository';
import { HolidayRepositoryWithEnrico } from './holiday.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([HolidayRepository]), EnricoModule],
  providers: [HolidayRepositoryWithEnrico],
  exports: [HolidayRepositoryWithEnrico]
})

export class HolidayDecoratorModule {}
