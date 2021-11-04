import { Module } from '@nestjs/common';
import { EnricoService } from './enrico.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [EnricoService],
  exports: [EnricoService]
})

export class EnricoModule {}
