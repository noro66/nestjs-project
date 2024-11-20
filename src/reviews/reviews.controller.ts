import { Controller, Get } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller()
export class ReviewsController {
  constructor(private readonly revewsService: ReviewsService) {}
  @Get('api/reviews')
  public getAllReviews() {
    return this.revewsService.getAll();
  }
}
