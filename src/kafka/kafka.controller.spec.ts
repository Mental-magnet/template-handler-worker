import { Test, TestingModule } from '@nestjs/testing';
import { TemplateHandlerController } from './templateHandler/templateHandler.controller';

describe('TemplateHandlerController', () => {
  let controller: TemplateHandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateHandlerController],
    }).compile();

    controller = module.get<TemplateHandlerController>(TemplateHandlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
