// Super Cool Project (KD AC) Express Server Entry Point
const path = require('path');
const fs = require('fs');

// Check if bundled server exists in dist or run directly
const distServerPath = path.join(__dirname, 'dist', 'server.cjs');
if (fs.existsSync(distServerPath)) {
  require(distServerPath);
} else {
  // ESM loader bridge when running directly without build
  import('./server.ts').catch((err) => {
    console.error('Failed to load server.ts:', err);
  });
}
