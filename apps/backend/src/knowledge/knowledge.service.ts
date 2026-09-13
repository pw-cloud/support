import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';

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

  async create(data: CreateKnowledgeDto) {
    const title =
      (data.title ??
        [data.category, data.manufacturer, data.model]
          .filter(Boolean)
          .join(' - ')) || 'Neues Knowledge-Element';

    return this.prisma.knowledgeEntry.create({
      data: {
        title,
        summary: data.summary ?? null,
        content: data.content ?? '',
        category: data.category as any,
        manufacturer: data.manufacturer ?? null,
        model: data.model ?? null,
        problem: data.problem ?? null,
        cause: data.cause ?? null,
        solution: data.solution ?? null,
        technicalDetails: data.technicalDetails ?? null,
        entryType: (data.entryType ?? 'PROBLEM') as any,
        status: (data.status ?? 'NEW') as any,
        verificationStatus: (data.verificationStatus ?? 'UNVERIFIED') as any,
        categoryId: data.categoryId ?? null,
      },
    });
  }

  async update(id: string, data: UpdateKnowledgeDto) {
    await this.findOne(id);

    const title =
      (data.title ??
        [data.category, data.manufacturer, data.model]
          .filter(Boolean)
          .join(' - ')) || 'Neues Knowledge-Element';

    return this.prisma.knowledgeEntry.update({
      where: {
        id,
      },
      data: {
        title,
        summary: data.summary ?? null,
        content: data.content ?? '',
        category: data.category as any,
        manufacturer: data.manufacturer ?? null,
        model: data.model ?? null,
        problem: data.problem ?? null,
        cause: data.cause ?? null,
        solution: data.solution ?? null,
        technicalDetails: data.technicalDetails ?? null,
        entryType: data.entryType as any,
        status: data.status as any,
        verificationStatus: data.verificationStatus as any,
        categoryId: data.categoryId ?? null,
      },
    });
  }
    async remove(id: string) {
    await this.findOne(id);

    return this.prisma.knowledgeEntry.delete({
      where: {
        id,
      },
    });
  }
}
