import { GetArticleByIdHandler } from './application/query/get-article-by-id.handler';
import { GetArticlesHandler } from './application/query/get-articles.handler';
import { ArticlesRepository } from './model/articles.repository';
import { PrismaArticlesRepository } from './infra/database/prisma-articles.repository';

export const articlesProviders = [
  {
    provide: ArticlesRepository,
    useClass: PrismaArticlesRepository,
  },
  GetArticlesHandler,
  GetArticleByIdHandler,
];
