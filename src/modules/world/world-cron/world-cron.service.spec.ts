import { Test, TestingModule } from '@nestjs/testing';
import { WorldCronService } from './world-cron.service';

describe('WorldCronService', () => {
  let service: WorldCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorldCronService],
    }).compile();

    service = module.get<WorldCronService>(WorldCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
