import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategoryList() {
    const result = await this.categoryRepository.find({
      where: {
        status: 1,
      },
      order: {
        level: 'DESC',
      },
    });

    return result;
  }
}