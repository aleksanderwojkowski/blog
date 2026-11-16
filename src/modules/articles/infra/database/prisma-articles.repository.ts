import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { Article } from '../../model/article.model';
import { ArticlesRepository } from '../../model/articles.repository';

@Injectable()
export class PrismaArticlesRepository extends ArticlesRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(): Promise<Article[]> {
    return this.prisma.article.findMany({
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    });
  }

  async findById(id: string): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: { id },
    });
  }
}
