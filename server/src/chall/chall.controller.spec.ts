import { Test, TestingModule } from '@nestjs/testing';
import { ChallController } from './chall.controller';
import { ChallService } from './chall.service';

describe('ChallController', () => {
  let controller: ChallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallController],
      providers: [ChallService],
    }).compile();

    controller = module.get<ChallController>(ChallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
