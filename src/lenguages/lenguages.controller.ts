import { Controller } from '@nestjs/common';
import { LenguagesService } from './lenguages.service';

@Controller('lenguages')
export class LenguagesController {
  constructor(private readonly lenguagesService: LenguagesService) {}
}
