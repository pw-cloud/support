import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';

describe('KnowledgeController', () => {
  let controller: KnowledgeController;
  let service: {
    remove: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      remove: jest.fn().mockResolvedValue({ id: 'abc' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnowledgeController],
      providers: [
        {
          provide: KnowledgeService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get(KnowledgeController);
  });

  it('should remove an entry by id', async () => {
    const result = await controller.remove('abc');

    expect(service.remove).toHaveBeenCalledWith('abc');
    expect(result).toEqual({ id: 'abc' });
  });
});
