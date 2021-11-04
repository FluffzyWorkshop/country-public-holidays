
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from './country/country.module';
import { HolidayModule } from './holiday/holiday.module';
import { HolidayName } from './holiday/entities/holiday_names.entity';
import { Holiday } from './holiday/entities/holiday.entity';
import { Country } from './country/entities/country.entity';
require('dotenv').config();


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    keepConnectionAlive: true,
    entities: [Country, Holiday, HolidayName],
  }), CountryModule, HolidayModule],
})

export class AppModule {
}



