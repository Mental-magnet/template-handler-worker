# NestJS Base API

A base API template built with NestJS, Fastify, and Swagger for future projects.

## Features

- 🚀 Fastify as HTTP provider for better performance
- 📚 Swagger/OpenAPI documentation
- ⚡️ Health check endpoint
- 🔖 Version information endpoint
- 🔒 CORS configuration
- ✨ Input validation using class-validator
- 📝 Well-documented codebase
- 🎯 TypeScript support
- 🛠 ESLint + Prettier setup

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Environment Variables

Copy `.env.example` to `.env` and adjust the values as needed:

```bash
cp .env.example .env
```

Available environment variables:

- `PORT`: Server port (default: 3000)
- `API_PREFIX`: Global API prefix (default: api/v1)
- `NODE_ENV`: Environment (development/production)
- `SWAGGER_TITLE`: API documentation title
- `SWAGGER_DESCRIPTION`: API description
- `SWAGGER_VERSION`: API version
- `CORS_ENABLED`: Enable/disable CORS
- `CORS_ORIGIN`: CORS origin configuration

## API Documentation

Once the application is running, you can access:

- Swagger UI: `http://localhost:3000/api/docs`
- OpenAPI JSON: `http://localhost:3000/api/docs-json`

## Available Endpoints

### Health Check

```http
GET /api/v1/health
```

Returns the current status and uptime of the service.

### Version Information

```http
GET /api/v1/version
```

Returns the current version and build information of the API.

## Development

```bash
# format code
npm run format

# lint code
npm run lint

# run tests
npm run test
npm run test:e2e
npm run test:cov
```

## Project Structure

```
src/
├── config/             # Configuration files
│   ├── cors.config.ts
│   ├── database.config.ts
│   └── swagger.config.ts
├── health/            # Health check feature
│   ├── health.controller.ts
│   ├── health.module.ts
│   ├── health.service.ts
│   ├── dto/
│   │   └── health.dto.ts
│   └── schemas/
│       └── health.schema.ts
├── utils/             # Utility modules
│   └── logger.ts
├── version/           # Version info feature
│   ├── version.controller.ts
│   ├── version.module.ts
│   ├── version.service.ts
│   ├── dto/
│   │   └── version.dto.ts
│   └── schemas/
│       └── version.schema.ts
├── app.module.ts      # Main application module
└── main.ts           # Application entry point
```

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'Add amazing feature'`
3. Push to the branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.