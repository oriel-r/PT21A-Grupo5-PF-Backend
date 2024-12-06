import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
  
  @Injectable()
  export class FilesPipe implements PipeTransform {
    private min: number;
    private max: number;
    private mimetype: string[];
  
    constructor(min: number, max: number, mimetype: string[]) {
      this.max = max;
      this.min = min;
      this.mimetype = mimetype;
    }
  
    transform(values: Record<string, Express.Multer.File[]>, metadata: ArgumentMetadata) {
      for (const key in values) {
        const files = values[key];
  
        if (!Array.isArray(files) || files.length === 0) {
            throw new BadRequestException(`No se proporcionaron archivos para "${key}".`);
          }
  
        files.forEach((file) => {
          if (!file) {
            throw new BadRequestException(`Se requiere un archivo en "${key}".`);
          }
          if (file.size > this.max) {
            throw new BadRequestException(`El archivo "${file.originalname}" en "${key}" excede el tamaño máximo permitido (${this.max} bytes).`);
          }
          if (file.size < this.min) {
            throw new BadRequestException(`El archivo "${file.originalname}" en "${key}" es más pequeño que el tamaño mínimo permitido (${this.min} bytes).`);
          }
          if (!this.mimetype.includes(file.mimetype)) {
            throw new BadRequestException(`El archivo "${file.originalname}" en "${key}" tiene un formato inválido. Solo se permiten: ${this.mimetype.join(', ')}.`);          }
        });
      }
  
      return values;
    }
  }
  