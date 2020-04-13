import { Test, TestingModule } from '@nestjs/testing';
import { VoiceCallController } from './voice-call.controller';

describe('VoiceCall Controller', () => {
  let controller: VoiceCallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoiceCallController],
    }).compile();

    controller = module.get<VoiceCallController>(VoiceCallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
