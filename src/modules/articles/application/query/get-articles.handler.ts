import { Injectable } from '@nestjs/common';
import { Article } from '../../model/article.model';
import { ArticlesRepository } from '../../model/articles.repository';
import { GetArticlesQuery } from './get-articles.query';

@Injectable()
export class GetArticlesHandler {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async execute(query: GetArticlesQuery): Promise<Article[]> {
    void query;
    return this.articlesRepository.findAll();
  }
}
