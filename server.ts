import app from './src/server-app.ts';
import path from 'path';
import fs from 'fs';
import express from 'express';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const PORT = 3000;

  // Logo fallback serving (supports both jpeg and older jpg extensions gracefully)
  app.get('/logo.jpeg', (req, res) => {
    const publicPath = path.join(process.cwd(), 'public', 'logo.jpeg');
    if (fs.existsSync(publicPath)) {
      return res.sendFile(publicPath);
    }
    const assetsPath = path.join(process.cwd(), 'src', 'assets', 'logo.jpeg');
    if (fs.existsSync(assetsPath)) {
      return res.sendFile(assetsPath);
    }
    const distPath = path.join(process.cwd(), 'dist', 'logo.jpeg');
    if (fs.existsSync(distPath)) {
      return res.sendFile(distPath);
    }
    res.status(404).send('Logo not found');
  });

  app.get('/logo.jpg', (req, res) => {
    const publicPath = path.join(process.cwd(), 'public', 'logo.jpeg');
    if (fs.existsSync(publicPath)) {
      return res.sendFile(publicPath);
    }
    const assetsPath = path.join(process.cwd(), 'src', 'assets', 'logo.jpeg');
    if (fs.existsSync(assetsPath)) {
      return res.sendFile(assetsPath);
    }
    res.status(404).send('Logo not found');
  });

  // Integrate Vite server in development or serve static dist directory in production
  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
