import { createServer } from 'net';

export async function getAvailablePort(startPort: number, maxAttempts = 10): Promise<number> {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const port = startPort + attempt;
    const server = createServer();

    try {
      await new Promise<void>((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, '127.0.0.1', () => {
          server.close(() => resolve());
        });
      });
      return port;
    } catch {
      // try the next port
    }
  }

  throw new Error(`No free port available starting from ${startPort}`);
}
