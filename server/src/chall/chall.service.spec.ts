import { Test, TestingModule } from '@nestjs/testing';
import { ChallService } from './chall.service';

describe('ChallService', () => {
  let service: ChallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallService],
    }).compile();

    service = module.get<ChallService>(ChallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
