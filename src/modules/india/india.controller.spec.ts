import { Test, TestingModule } from '@nestjs/testing';
import { IndiaController } from './india.controller';

describe('India Controller', () => {
  let controller: IndiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndiaController],
    }).compile();

    controller = module.get<IndiaController>(IndiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
