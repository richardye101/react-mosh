function init() {
  // Sentry.init({
  //   dsn: "https://66a3dd08bd024c9c9471cb46d65c2364@o1298977.ingest.sentry.io/6530659",
  //   integrations: [new BrowserTracing()],
  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 0.4,
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.error(error);
}

export default {
  init,
  log,
};
