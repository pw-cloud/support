import { Body, Controller, Get, Post } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';

@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Get()
  findAll() {
    return this.knowledgeService.findAll();
  }

  @Post()
  create(@Body() body: { title: string; content: string }) {
    return this.knowledgeService.create(body);
  }
}
