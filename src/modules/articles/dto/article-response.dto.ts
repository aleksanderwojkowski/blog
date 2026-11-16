import { ApiProperty } from '@nestjs/swagger';

export class ArticleResponse {
  @ApiProperty({
    example: '11111111-1111-4111-8111-111111111111',
  })
  id: string;

  @ApiProperty({ example: 'My First Article' })
  title: string;

  @ApiProperty({ example: 'This is my first blog article.' })
  content: string;

  @ApiProperty({ example: '2026-01-10T10:00:00.000Z' })
  publishedAt: Date;
}
