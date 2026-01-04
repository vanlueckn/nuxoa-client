import { describe, it, expect, beforeAll } from 'bun:test';
import { NuxoaClient, NuxoaApiError } from '../../src/index';

describe('Cloud Endpoints (Integration Tests)', () => {
  let client: NuxoaClient;
  let serverId: number | null = null;

  beforeAll(() => {
    const customerId = process.env.NUXOA_CUSTOMER_ID;
    const apiKey = process.env.NUXOA_API_KEY;

    if (!customerId || !apiKey) {
      console.warn('Skipping integration tests - NUXOA_CUSTOMER_ID and NUXOA_API_KEY env vars not set');
    }

    client = new NuxoaClient({
      customerId: customerId || 'test',
      apiKey: apiKey || 'test',
    });
  });

  describe('GET /cloud/pricing', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;

    if (!shouldRun) {
      it.skip('should return cloud server pricing');
    } else {
      it('should return cloud server pricing', async () => {
        const response = await client.cloud.getPricing();
        expect(response.code).toBe('100');
        expect(response.data).toBeDefined();
        expect(response.data.currency).toBeDefined();
        expect(response.data.base).toBeDefined();
        expect(response.data.cores).toBeDefined();
        expect(response.data.ram).toBeDefined();
        expect(response.data.storage).toBeDefined();
        expect(response.data.snapshots).toBeDefined();
        expect(response.data.additional_ips).toBeDefined();
      });
    }
  });

  describe('GET /cloud/info', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should return server information');
      it.skip('should throw error for invalid server ID');
    } else if (!testServerId) {
      console.warn('Skipping cloud info tests - NUXOA_TEST_CLOUD_SERVER_ID not set');
      it.skip('should return server information');
      it.skip('should throw error for invalid server ID');
    } else {
      it('should return server information', async () => {
        const response = await client.cloud.getInfo(parseInt(testServerId));
        expect(response.code).toBe('100');
        expect(response.data).toBeDefined();
        expect(response.data.hostname).toBeDefined();
        expect(response.data.ipv4).toBeDefined();
        expect(response.data.resources).toBeDefined();
      });

      it('should throw error for invalid server ID', async () => {
        try {
          await client.cloud.getInfo(999999);
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBeInstanceOf(NuxoaApiError);
          if (error instanceof NuxoaApiError) {
            expect(error.code).toBe(804);
          }
        }
      });
    }
  });

  describe('GET /cloud/start', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should start a server');
    } else if (!testServerId) {
      it.skip('should start a server');
    } else {
      it('should start a server', async () => {
        const response = await client.cloud.start(parseInt(testServerId));
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('GET /cloud/reboot', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should reboot a server');
    } else if (!testServerId) {
      it.skip('should reboot a server');
    } else {
      it('should reboot a server', async () => {
        const response = await client.cloud.reboot(parseInt(testServerId));
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('GET /cloud/shutdown', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should shutdown a server');
    } else if (!testServerId) {
      it.skip('should shutdown a server');
    } else {
      it('should shutdown a server', async () => {
        const response = await client.cloud.shutdown(parseInt(testServerId));
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('GET /cloud/reinstall', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should reinstall server OS');
    } else if (!testServerId) {
      it.skip('should reinstall server OS');
    } else {
      it('should reinstall server OS', async () => {
        const response = await client.cloud.reinstall(parseInt(testServerId), 'Debian 12');
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('GET /cloud/password', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should reset administrator password');
    } else if (!testServerId) {
      it.skip('should reset administrator password');
    } else {
      it('should reset administrator password', async () => {
        const response = await client.cloud.resetPassword(parseInt(testServerId));
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('POST /cloud/key', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;
    const testSshKey = process.env.NUXOA_TEST_SSH_KEY;

    if (!shouldRun) {
      it.skip('should authorize SSH key');
    } else if (!testServerId || !testSshKey) {
      it.skip('should authorize SSH key');
    } else {
      it('should authorize SSH key', async () => {
        const response = await client.cloud.authorizeSshKey(parseInt(testServerId), testSshKey);
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('GET /cloud/hostname', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should set hostname');
    } else if (!testServerId) {
      it.skip('should set hostname');
    } else {
      it('should set hostname', async () => {
        const response = await client.cloud.setHostname(parseInt(testServerId), 'test.example.com');
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('GET /cloud/ptr', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should set reverse DNS (PTR)');
    } else if (!testServerId) {
      it.skip('should set reverse DNS (PTR)');
    } else {
      it('should set reverse DNS (PTR)', async () => {
        const response = await client.cloud.setPtr(parseInt(testServerId), '1.2.3.4', 'ptr.example.com');
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('GET /cloud/vnc', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should return VNC console URL');
    } else if (!testServerId) {
      it.skip('should return VNC console URL');
    } else {
      it('should return VNC console URL', async () => {
        const response = await client.cloud.getVnc(parseInt(testServerId));
        expect(response.url).toBeDefined();
      });
    }
  });

  describe('GET /cloud/graphs', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should return server graphs');
    } else if (!testServerId) {
      it.skip('should return server graphs');
    } else {
      it('should return server graphs', async () => {
        const response = await client.cloud.getGraphs(parseInt(testServerId), 'day');
        expect(response.cpu).toBeDefined();
        expect(response.memory).toBeDefined();
        expect(response.storage).toBeDefined();
        expect(response.network).toBeDefined();
        expect(response.io).toBeDefined();
      });
    }
  });

  describe('GET /cloud/traffic', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should return traffic graphs');
    } else if (!testServerId) {
      it.skip('should return traffic graphs');
    } else {
      it('should return traffic graphs', async () => {
        const now = Math.floor(Date.now() / 1000);
        const oneDayAgo = now - 86400;

        const response = await client.cloud.getTraffic(parseInt(testServerId), oneDayAgo, now);
        expect(response.image_url).toBeDefined();
      });
    }
  });

  describe('GET /cloud/ddos', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should return DDoS attacks');
    } else if (!testServerId) {
      it.skip('should return DDoS attacks');
    } else {
      it('should return DDoS attacks', async () => {
        const response = await client.cloud.getDdos(parseInt(testServerId));
        expect(Array.isArray(response)).toBe(true);
      });
    }
  });

  describe('GET /cloud/snapshot', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should create a snapshot');
    } else if (!testServerId) {
      it.skip('should create a snapshot');
    } else {
      it('should create a snapshot', async () => {
        const response = await client.cloud.createSnapshot(parseInt(testServerId));
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('GET /cloud/rollback', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;
    const testSnapshot = process.env.NUXOA_TEST_SNAPSHOT_ID;

    if (!shouldRun) {
      it.skip('should restore a snapshot');
    } else if (!testServerId || !testSnapshot) {
      it.skip('should restore a snapshot');
    } else {
      it('should restore a snapshot', async () => {
        const response = await client.cloud.restoreSnapshot(parseInt(testServerId), testSnapshot);
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('GET /cloud/delsnap', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;
    const testSnapshot = process.env.NUXOA_TEST_SNAPSHOT_ID;

    if (!shouldRun) {
      it.skip('should delete a snapshot');
    } else if (!testServerId || !testSnapshot) {
      it.skip('should delete a snapshot');
    } else {
      it('should delete a snapshot', async () => {
        const response = await client.cloud.deleteSnapshot(parseInt(testServerId), testSnapshot);
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('GET /cloud/upgrade', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should upgrade server resources');
    } else if (!testServerId) {
      it.skip('should upgrade server resources');
    } else {
      it('should upgrade server resources', async () => {
        const response = await client.cloud.upgrade({
          id: parseInt(testServerId),
          cores: 4,
          ram: 8,
          storage: 100,
          snapshots: 2,
          additional_ips: 1,
        });
        expect(response.success).toBeDefined();
        expect(response.billed).toBeDefined();
        expect(response.new_price).toBeDefined();
      });
    }
  });

  describe('GET /cloud/refund', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;

    if (!shouldRun) {
      it.skip('should request a refund');
    } else if (!testServerId) {
      it.skip('should request a refund');
    } else {
      it('should request a refund', async () => {
        const response = await client.cloud.requestRefund(parseInt(testServerId));
        expect(response.success).toBeDefined();
        expect(response.refund).toBeDefined();
      });
    }
  });

  describe('GET /cloud/order', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testOrderServer = process.env.NUXOA_TEST_ORDER_SERVER;

    if (!shouldRun) {
      it.skip('should order a new server');
    } else if (!testOrderServer) {
      it.skip('should order a new server');
    } else {
      it('should order a new server', async () => {
        const response = await client.cloud.order({
          cores: 2,
          ram: 4,
          storage: 50,
          snapshots: 1,
          additional_ips: 0,
          os: 'Debian 12',
          hostname: 'test.example.com',
        });
        expect(response.id).toBeDefined();
        expect(response.price).toBeDefined();
        serverId = response.id;
      });
    }
  });
});
