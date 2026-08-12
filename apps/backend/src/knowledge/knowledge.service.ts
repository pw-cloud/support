import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KnowledgeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.knowledgeEntry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(data: {
    title: string;
    content: string;
  }) {
    return this.prisma.knowledgeEntry.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }
}
