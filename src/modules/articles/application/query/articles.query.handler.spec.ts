import { NotFoundException } from '@nestjs/common';
import { ArticlesRepository } from '../../model/articles.repository';
import { Article } from '../../model/article.model';
import { GetArticlesHandler } from './get-articles.handler';
import { GetArticleByIdHandler } from './get-article-by-id.handler';
import { GetArticleByIdQuery } from './get-article-by-id.query';

describe('Articles query handlers', () => {
  const article: Article = {
    id: '11111111-1111-4111-8111-111111111111',
    title: 'Test article',
    content: 'Test content',
    publishedAt: new Date('2026-01-10'),
  };

  let repository: jest.Mocked<ArticlesRepository>;

  beforeEach(() => {
    repository = {
      findAll: jest.fn(),
      findById: jest.fn(),
    };
  });

  it('should return all articles', async () => {
    repository.findAll.mockResolvedValue([article]);

    const handler = new GetArticlesHandler(repository);

    await expect(handler.execute({})).resolves.toEqual([article]);
  });

  it('should return an article by ID', async () => {
    repository.findById.mockResolvedValue(article);

    const handler = new GetArticleByIdHandler(repository);

    await expect(
      handler.execute(new GetArticleByIdQuery(article.id)),
    ).resolves.toEqual(article);
  });

  it('should throw NotFoundException when article does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    const handler = new GetArticleByIdHandler(repository);

    await expect(
      handler.execute(new GetArticleByIdQuery(article.id)),
    ).rejects.toThrow(NotFoundException);
  });
});
