import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoService {
  upload(id, title, mimetype, extention, buffer) {
    return true;
  }
}
