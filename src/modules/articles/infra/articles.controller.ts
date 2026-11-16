import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UuidParam } from '../../../core/validation/decorator/uuid-v4-param.decorator';
import { ArticleResponse } from '../dto/article-response.dto';
import { GetArticlesHandler } from '../application/query/get-articles.handler';
import { GetArticleByIdHandler } from '../application/query/get-article-by-id.handler';
import { GetArticlesQuery } from '../application/query/get-articles.query';
import { GetArticleByIdQuery } from '../application/query/get-article-by-id.query';

@ApiTags('articles')
@Controller('/api/v1/articles')
export class ArticlesController {
  constructor(
    private readonly getArticlesHandler: GetArticlesHandler,
    private readonly getArticleByIdHandler: GetArticleByIdHandler,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Returns all articles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of articles',
    type: ArticleResponse,
    isArray: true,
  })
  findAll() {
    return this.getArticlesHandler.execute(new GetArticlesQuery());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns an article by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article found',
    type: ArticleResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Article not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid UUID',
  })
  findOne(@UuidParam('id') id: string) {
    return this.getArticleByIdHandler.execute(new GetArticleByIdQuery(id));
  }
}
