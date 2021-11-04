import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { CountryDecoratorModule } from './country.decorator.module';
import { CountryRepository } from './repositories/country.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CountryRepository]), CountryDecoratorModule],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [CountryService],
})

export class CountryModule {}
