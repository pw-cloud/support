import { AddressInfo, createServer, Server } from 'net';
import { getAvailablePort } from './port';

describe('getAvailablePort', () => {
  let occupiedServer: Server | undefined;

  afterEach(async () => {
    if (occupiedServer) {
      await new Promise<void>((resolve, reject) => {
        occupiedServer!.close((err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
      occupiedServer = undefined;
    }
  });

  it('returns the next free port when the requested port is busy', async () => {
    occupiedServer = createServer();

    await new Promise<void>((resolve, reject) => {
      occupiedServer!.once('error', reject).listen(0, '127.0.0.1', () => resolve());
    });

    const occupiedPort = (occupiedServer.address() as AddressInfo).port;
    const availablePort = await getAvailablePort(occupiedPort, 3);

    expect(availablePort).toBeGreaterThan(occupiedPort);
  });
});
