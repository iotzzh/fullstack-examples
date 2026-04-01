import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'node:path';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // /web/
  // - dev: proxy to Vite dev server (HMR)
  // - prod: serve built static assets
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    const webRoot = path.join(__dirname, '..', 'public', 'web');
    app.use('/web', express.static(webRoot, { index: false }));
    const server = app.getHttpAdapter().getInstance();
    server.get('/web/*', (_req: any, res: any) => {
      res.sendFile(path.join(webRoot, 'index.html'));
    });
  } else {
    const target = process.env.WEB_DEV_SERVER_URL ?? 'http://localhost:5173';
    app.use(
      '/web',
      createProxyMiddleware({
        target,
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/web': '' },
      }),
    );

    // Vite HMR client uses websocket at /web (after base is set),
    // but also keep fallback for root-scoped websocket paths if needed.
    app.use(
      '/@vite',
      createProxyMiddleware({
        target,
        changeOrigin: true,
        ws: true,
      }),
    );
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
