import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): { status: string } {
    return this.appService.getHealth();
  }

  @Get('db-test')
  async getDatabaseTest() {
    const count = await this.prisma.knowledgeEntry.count();

    return {
      status: 'ok',
      database: 'connected',
      knowledgeEntries: count,
    };
  }
}
