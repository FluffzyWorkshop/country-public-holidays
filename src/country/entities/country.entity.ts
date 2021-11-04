import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// ICountry
export interface ICountry {
  code: string;
  full_name: string;
}

// Entity
@Entity('countries')
export class Country {

  @ApiProperty()
  @PrimaryColumn("char", { length: 3 })
  code: string;

  @ApiProperty()
  @Column()
  full_name: string;
}


