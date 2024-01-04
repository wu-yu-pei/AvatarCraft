import { Controller, Get, Inject } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CategoryService) private readonly categoryService: CategoryService,
  ) {}

  @Get('list')
  async getCategoryList() {
    const result = await this.categoryService.getCategoryList();
    return result;
  }
}
