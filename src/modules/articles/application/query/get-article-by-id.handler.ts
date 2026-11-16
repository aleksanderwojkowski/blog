import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from '../../model/article.model';
import { ArticlesRepository } from '../../model/articles.repository';
import { GetArticleByIdQuery } from './get-article-by-id.query';

@Injectable()
export class GetArticleByIdHandler {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async execute(query: GetArticleByIdQuery): Promise<Article> {
    const article = await this.articlesRepository.findById(query.id);

    if (!article) {
      throw new NotFoundException(`Article with id ${query.id} not found`);
    }

    return article;
  }
}
