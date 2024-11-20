import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  public getAll() {
    return [
      { id: 1, rating: 4, comment: ' random coment' },
      { id: 1, rating: 4, comment: ' random coment' },
      { id: 1, rating: 4, comment: ' random coment' },
      { id: 1, rating: 4, comment: ' random coment' },
    ];
  }
}
