import { Article } from './article.model';

export abstract class ArticlesRepository {
  abstract findAll(): Promise<Article[]>;
  abstract findById(id: string): Promise<Article | null>;
}
