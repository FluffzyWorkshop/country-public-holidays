import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IndexHolidayDto {

  @IsNotEmpty()
  country_code: string;


  @IsNotEmpty()
  year: number;
}
