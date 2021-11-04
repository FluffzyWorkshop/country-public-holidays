import { IsDate, IsDateString, IsNotEmpty } from 'class-validator';

export class StatusHolidayDto {
  @IsNotEmpty()
  country_code: string;

  @IsNotEmpty()
  @IsDateString({ strict: true } as any)
  date = '2019-09-03';
}
