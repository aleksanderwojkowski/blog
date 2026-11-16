import { PrismaService } from '../../src/core/prisma/prisma.service';

const prisma = new PrismaService();

export async function main() {
  await prisma.article.deleteMany();

  await prisma.article.createMany({
    data: [
      {
        id: '11111111-1111-4111-8111-111111111111',
        title: 'My First Article',
        content: 'This is my first blog article.',
        publishedAt: new Date('2026-01-10T10:00:00.000Z'),
      },
      {
        id: '22222222-2222-4222-8222-222222222222',
        title: 'Learning NestJS',
        content: 'I am learning how to build APIs with NestJS.',
        publishedAt: new Date('2026-02-15T12:00:00.000Z'),
      },
      {
        id: '33333333-3333-4333-8333-333333333333',
        title: 'Working with Prisma',
        content: 'Prisma makes working with databases easier.',
        publishedAt: new Date('2026-03-20T14:00:00.000Z'),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
