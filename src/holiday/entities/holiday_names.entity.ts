import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Holiday } from './holiday.entity';
import { ApiProperty } from '@nestjs/swagger';

// IHolidayName
export interface IHolidayName {
  text: string;
  lang: string;
}

// Entity
@Entity('holiday_names')
export class HolidayName {

  constructor(partial: Partial<HolidayName>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  lang: string;

  @ApiProperty()
  @Column()
  text: string;

  // Relationships
  @ApiProperty()
  @ManyToOne(() => Holiday, holiday => holiday.name)
  @JoinColumn({ name: 'holiday_id' })
  holiday: Holiday;
}
