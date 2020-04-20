import { Test, TestingModule } from '@nestjs/testing';
import { IndiaCronService } from './india-cron.service';

describe('IndiaCronService', () => {
  let service: IndiaCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndiaCronService],
    }).compile();

    service = module.get<IndiaCronService>(IndiaCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
