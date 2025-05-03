import "./instrument";
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { setupCors } from './config/cors.config';
import { logger } from './utils/logger';

async function bootstrap() {

  logger.info('🚀 Starting NestJS application...');

  if (!process.env.KAFKA_BROKERS) {
    logger.error('❌ KAFKA_BROKER environment variable is not set. Exiting...');
    process.exit(1);
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: ['error', 'warn', 'log', 'debug', 'verbose'] }
  );

  const fastifyInstance = app.getHttpAdapter().getInstance();

  // Setup CORS
  logger.debug('⚙️ Configuring CORS');
  setupCors(fastifyInstance);

  // Global prefix
  const apiPrefix = process.env.API_PREFIX || 'api/v1';
  logger.debug(`🔗 Setting global prefix: ${apiPrefix}`);
  app.setGlobalPrefix(apiPrefix);

  // Setup Swagger documentation
  logger.debug('📚 Setting up Swagger documentation');
  setupSwagger(app);

  // Start the server
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  const url = await app.getUrl();
  logger.success('🌟 Application is running on:', { url });
  logger.success('📘 Swagger documentation:', { url: `${url}/api/docs` });
}

bootstrap().catch(error => {
  logger.error('❌ Error starting application:', error);
  process.exit(1);
});