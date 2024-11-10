import { Controller, Get } from '@nestjs/common';

@Controller()
export class ReviewsController {
  @Get('api/reviews')
  public getAllReviews() {
    return [
      { id: 1, rating: 4, comment: ' random coment' },
      { id: 1, rating: 4, comment: ' random coment' },
      { id: 1, rating: 4, comment: ' random coment' },
      { id: 1, rating: 4, comment: ' random coment' },
    ];
  }
}
