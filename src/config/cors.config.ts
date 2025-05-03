import { FastifyInstance } from 'fastify';

export const setupCors = (server: FastifyInstance) => {
  server.register(require('@fastify/cors'), {
    origin: process.env.CORS_ORIGIN || true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    maxAge: 600, // 10 minutes
    preflight: true,
    exposedHeaders: ['Content-Disposition'],
  });
};