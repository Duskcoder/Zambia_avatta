import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Move Sentry initialization inside platformBrowserDynamic().bootstrapModule()
platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    const Sentry = require("@sentry/angular");

    Sentry.init({
      dsn: "YOUR_SENTRY_DSN_HERE",
      integrations: [
        Sentry.BrowserTracing(),
      ],
      tracesSampleRate: 1.0,
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    });
  })
  .catch(err => console.error(err));
