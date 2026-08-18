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
    return this.prisma.knowledgeEntry.create({
      data: {
        title: data.title,
        summary: data.summary,
        content: data.content,
        problem: data.problem,
        cause: data.cause,
        solution: data.solution,
        technicalDetails: data.technicalDetails,
        entryType: data.entryType,
        status: data.status,
        verificationStatus: data.verificationStatus,
        categoryId: data.categoryId,
      },
    });
  }

  async update(id: string, data: UpdateKnowledgeDto) {
    await this.findOne(id);

    return this.prisma.knowledgeEntry.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        summary: data.summary,
        content: data.content,
        problem: data.problem,
        cause: data.cause,
        solution: data.solution,
        technicalDetails: data.technicalDetails,
        entryType: data.entryType,
        status: data.status,
        verificationStatus: data.verificationStatus,
        categoryId: data.categoryId,
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
