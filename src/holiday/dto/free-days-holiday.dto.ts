import { IsNotEmpty } from 'class-validator';

export class freeDaysHolidayDto {
  @IsNotEmpty()
  country_code: string;

  @IsNotEmpty()
  year: number;
}
