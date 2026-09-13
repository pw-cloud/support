import { KnowledgeService } from './knowledge.service';

describe('KnowledgeService', () => {
  it('uses Prisma defaults when creating an entry without enum fields', async () => {
    const create = jest.fn().mockResolvedValue({ id: 'entry-1' });
    const service = new KnowledgeService({
      knowledgeEntry: { create },
    } as never);

    await service.create({
      category: 'PC' as never,
      problem: 'Der Rechner startet nicht.',
    });

    expect(create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        entryType: 'PROBLEM',
        status: 'NEW',
        verificationStatus: 'UNVERIFIED',
      }),
    });
  });
});