import { Module } from '@nestjs/common';
import { LenguagesService } from './lenguages.service';
import { LenguagesController } from './lenguages.controller';

@Module({
  controllers: [LenguagesController],
  providers: [LenguagesService],
})
export class LenguagesModule {}
