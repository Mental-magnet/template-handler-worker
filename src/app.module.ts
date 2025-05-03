import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SentryModule , SentryGlobalFilter } from "@sentry/nestjs/setup";
import { KafkaModule } from './kafka/kafka.module';


@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      load: [],
      isGlobal: true,
    }),
    KafkaModule
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: SentryGlobalFilter, // Use Sentry's global filter for error handling
    },
  ]
})
export class AppModule {}