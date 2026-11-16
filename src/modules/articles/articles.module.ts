import { Module } from '@nestjs/common';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { ArticlesController } from './infra/articles.controller';
import { articlesProviders } from './articles.providers';

@Module({
  imports: [PrismaModule],
  controllers: [ArticlesController],
  providers: [...articlesProviders],
})
export class ArticlesModule {}
