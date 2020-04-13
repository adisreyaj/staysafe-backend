import { Test, TestingModule } from '@nestjs/testing';
import { VoiceCallService } from './voice-call.service';

describe('VoiceCallService', () => {
  let service: VoiceCallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoiceCallService],
    }).compile();

    service = module.get<VoiceCallService>(VoiceCallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
