import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../../country/entities/country.entity';
import { HolidayName } from './holiday_names.entity';
import { getDifferenceInDays } from '../../helpers/date';
import { ApiProperty } from '@nestjs/swagger';

// IHoliday
export interface IHoliday {
  id: number;
  type: string;
  name: HolidayName[];
  country: Country;
  start_at: Date;
  end_at: Date;
}

// Entity
@Entity('holidays')
export class Holiday {

  constructor(partial: Partial<Holiday>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column({ type: 'date' })
  start_at: Date;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  end_at: Date;

  @ApiProperty()
  @Column()
  year: number;

  // Relationships
  // belongs to
  @ApiProperty()
  @ManyToOne(() => Country, country => country.code, { eager: true })
  @JoinColumn({ name: 'country_code' })
  country: Country;

  // has many
  @ApiProperty()
  @OneToMany(type => HolidayName, holidayName => holidayName.holiday, {
    cascade: ['insert'],
    eager: true,
  })
  name: HolidayName[];

  // hooks
  @BeforeInsert()
  endAt() {
    if (this.end_at == null) {
      this.end_at = this.start_at;
    }
  }
}
