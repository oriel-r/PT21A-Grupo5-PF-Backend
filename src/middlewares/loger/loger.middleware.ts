import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`A ${req.method} in ${req.url} at ${new Date()}`)
    next();
  }
}
