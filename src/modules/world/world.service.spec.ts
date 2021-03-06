import { Test, TestingModule } from '@nestjs/testing';
import { WorldService } from './world.service';

describe('WorldService', () => {
  let service: WorldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorldService],
    }).compile();

    service = module.get<WorldService>(WorldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
