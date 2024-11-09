import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FilePipe implements PipeTransform {
  min: number;
  max: number;
  mimetype: string[];

  constructor(min: number, max: number, mimetype: string[]) {
    this.max = max;
    this.min = min;
    this.mimetype = mimetype;
  }
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    console.log('pipe', value);
    if (!value) throw new BadRequestException('file is required');
    if (Number(value.size) > this.max)
      throw new BadRequestException('this file is larger than allowed');
    if (Number(value.size) < this.min)
      throw new BadRequestException('this file is smaller than allowed');
    if (!this.mimetype.includes(value.mimetype))
      throw new BadRequestException('file format is invalid');

    return value;
  }
}
