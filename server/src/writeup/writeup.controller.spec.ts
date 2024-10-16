import { Test, TestingModule } from '@nestjs/testing';
import { WriteupController } from './writeup.controller';
import { WriteupService } from './writeup.service';

describe('WriteupController', () => {
  let controller: WriteupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WriteupController],
      providers: [WriteupService],
    }).compile();

    controller = module.get<WriteupController>(WriteupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
