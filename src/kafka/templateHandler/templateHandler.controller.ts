import { Controller , Inject, ValidationPipe , UsePipes} from '@nestjs/common';
import { EventPattern , ClientKafkaProxy , Payload , Ctx , KafkaContext} from '@nestjs/microservices';

import { PureAudioRequest , AudioRequest } from '../schemas/audioRequest.schema';
import { logger } from '@/utils/logger';
import { log } from 'console';

@Controller()
export class TemplateHandlerController {
    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafkaProxy,
    ) {}
    
    async onModuleInit() {
        await this.kafkaService.connect();
    }

    @EventPattern("audioRequest")
    @UsePipes(new ValidationPipe({ transform: true })) // * like in pydantic, this will remove any extra fields that are not in the schema!
    async handleKafkaMessage (
        @Payload() message: PureAudioRequest,
        @Ctx() context: KafkaContext
    ) : Promise<void> 
    {
        logger.info('Received message:', message);
        logger.info('Kafka context:', {
            topic: context.getTopic(),
            partition: context.getPartition(),
            offset: context.getMessage().offset,
            timestamp: context.getMessage().timestamp,
        });

        const toSend : AudioRequest = Object.assign({}, message , {
                exportSettings: {
                    ...message.settings.exportSettings,
                    path: message.settings.templateSettings.templates,
                }
            }
        );

        await fetch(
            `${process.env.MENTAL_API_URL as string}/audioRequest/createAudioRequest`,
            {
                method: "POST",
                body : JSON.stringify(toSend),
            }
        )

        this.kafkaService.emit(
            "generativeForm",
            JSON.stringify(toSend)
        )

    }
}