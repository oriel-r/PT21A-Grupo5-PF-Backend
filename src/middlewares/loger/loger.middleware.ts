import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(`A ${req.method} in ${req.url} at ${ new Date() }`);
    next();
  }
}
