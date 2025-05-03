import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyInstance } from 'fastify';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export const setupSwagger = (
  app: NestFastifyApplication,
  // server: FastifyInstance, not used in this context
) => {
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'NestJS Base API')
    .setDescription(
      process.env.SWAGGER_DESCRIPTION || 'Base API template for future projects',
    )
    .setVersion(process.env.SWAGGER_VERSION || '1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'NestJS Base API Documentation',
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      displayRequestDuration: true,
    },
  });
};