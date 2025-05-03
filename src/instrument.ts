if (!process.env.SENTRY_DSN) {
  console.log("Its posible that you are running this in a local environment, so we will load the env file from the setup.env file")
  process.loadEnvFile(
    "setup.env"
  )
}

console.log("Initializing Sentry...");
console.log("SENTRY_DSN: ", process.env.SENTRY_DSN?.slice(0, 5) + "*****");
console.log("SENTRY_TRACES_SAMPLE_RATE: ", process.env.SENTRY_TRACES_SAMPLE_RATE);
console.log("SENTRY_PROFILES_SAMPLE_RATE: ", process.env.SENTRY_PROFILES_SAMPLE_RATE);
console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("SENTRY_ENVIRONMENT: ", process.env.SENTRY_ENVIRONMENT);
console.log("RELEASE: ", process.env.RELEASE);


import * as Sentry from "@sentry/nestjs"
import { nodeProfilingIntegration } from "@sentry/profiling-node";


// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
  ],

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE),

  // Set sampling rate for profiling
  // This is relative to tracesSampleRate
  profileSessionSampleRate: Number(process.env.SENTRY_PROFILES_SAMPLE_RATE),

  // Trace lifecycle automatically enables profiling during active traces
  profileLifecycle: 'trace',


  environment: process.env.NODE_ENV || process.env.SENTRY_ENVIRONMENT || 'development',

  release: process.env.SWAGGER_VERSION || "unknown",
});