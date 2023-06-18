import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const ret = `[${Date()}] Hello World`
    return ret;
  }
}
