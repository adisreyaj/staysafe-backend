import { Test, TestingModule } from '@nestjs/testing';
import { IndiaService } from './india.service';

describe('IndiaService', () => {
  let service: IndiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndiaService],
    }).compile();

    service = module.get<IndiaService>(IndiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
