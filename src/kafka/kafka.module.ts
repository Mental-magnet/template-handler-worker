import { Module } from '@nestjs/common';

import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import { ClientsModule , Transport } from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { TemplateHandlerController } from './templateHandler/templateHandler.controller';
import { TemplateHandlerService } from './templateHandler/templateHandler.service';

@Module({
  imports : [
    ClientsModule.register([
      {
        name: "KAFKA_SERVICE",
        transport : Transport.KAFKA,
        options : {
          run : {
            autoCommit : false, // Disable auto-commit to handle offsets manually
          },

          client : {
            
            brokers : (process.env.KAFKA_BROKERS || 'localhost:9093').split(','),
            clientId : process.env.KAFKA_CLIENT_ID as string,
            connectionTimeout : 5000, // 5 seconds

            ssl : {
              rejectUnauthorized : false,
              ca : [readFileSync(process.env.KAFKA_CA as string, 'utf-8')],
              key : readFileSync(process.env.KAFKA_KEY as string, 'utf-8'),
              cert : readFileSync(process.env.KAFKA_CERT as string, 'utf-8'),
            },

            retry : {
              maxRetryTime : 30000, // 30 seconds
              initialRetryTime : 100, // 100 milliseconds
              multiplier : 0.2, // Exponential backoff factor, 100 * 0.2 = 20ms so the next retry will be 20ms, then 4ms, etc.
              retries : 10, // Number of retries before giving up
            },

            logLevel : logLevel.INFO, // Set the log level to INFO

          },
          consumer : {
            groupId : process.env.KAFKA_GROUP_ID as string,
            sessionTimeout : 60000, // 60 seconds
            maxInFlightRequests : 1, // Maximum number of requests in flight at any time, means that we will only process one message at a time
            heartbeatInterval : 30000, // 30 seconds
          },
        }
      }
    ]),
  ],

  providers: [TemplateHandlerService],

  controllers: [TemplateHandlerController]
})
export class KafkaModule {}
