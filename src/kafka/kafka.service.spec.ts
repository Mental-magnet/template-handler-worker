import { Test, TestingModule } from '@nestjs/testing';
import { TemplateHandlerService } from './templateHandler/templateHandler.service';

describe('TemplateHandlerService', () => {
  let service: TemplateHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateHandlerService],
    }).compile();

    service = module.get<TemplateHandlerService>(TemplateHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
