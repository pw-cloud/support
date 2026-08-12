import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const entry = await this.prisma.knowledgeEntry.findUnique({
      where: {
        id,
      },
    });

    if (!entry) {
      throw new NotFoundException('Knowledge entry not found');
    }

    return entry;
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
async update(
  id: string,
  data: {
    title?: string;
    content?: string;
  },
) {
  await this.findOne(id);

  return this.prisma.knowledgeEntry.update({
    where: {
      id,
    },
    data,
  });
}}
