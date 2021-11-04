import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryRepository } from './repositories/country.repository';
import { CountryRepositoryWithEnrico } from './country.decorator';
import { EnricoModule } from '../third_parties/enrico.module';

@Module({
  imports: [TypeOrmModule.forFeature([CountryRepository]), EnricoModule],
  providers: [CountryRepositoryWithEnrico],
  exports: [CountryRepositoryWithEnrico]
})

export class CountryDecoratorModule {}
