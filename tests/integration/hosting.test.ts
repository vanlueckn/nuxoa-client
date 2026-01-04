import { describe, it, expect, beforeAll } from 'bun:test';
import { NuxoaClient, NuxoaApiError } from '../../src/index';

describe('Hosting Endpoints (Integration Tests)', () => {
  let client: NuxoaClient;

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

  describe('GET /hosting/set', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;
    const testContractId = process.env.NUXOA_TEST_DEDICATED_CONTRACT_ID;

    if (!shouldRun) {
      it.skip('should set note/description for cloud server');
      it.skip('should set note/description for dedicated server');
    } else if (!testServerId) {
      it.skip('should set note/description for cloud server');
    } else {
      it('should set note/description for cloud server', async () => {
        const response = await client.hosting.setNote({
          id: parseInt(testServerId),
          note: 'Test note for cloud server',
        });
        expect(response.code).toBe('100');
        expect(response.data).toBeDefined();
      });
    }

    if (!shouldRun) {
      it.skip('should set note/description for dedicated server');
    } else if (!testContractId) {
      it.skip('should set note/description for dedicated server');
    } else {
      it('should set note/description for dedicated server', async () => {
        const response = await client.hosting.setNote({
          id: parseInt(testContractId),
          note: 'Test note for dedicated server',
        });
        expect(response.code).toBe('100');
        expect(response.data).toBeDefined();
      });
    }
  });

  describe('GET /hosting/cancel', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_CLOUD_SERVER_ID;
    const testContractId = process.env.NUXOA_TEST_DEDICATED_CONTRACT_ID;
    const testIpContractId = process.env.NUXOA_TEST_IP_CONTRACT_ID;

    if (!shouldRun) {
      it.skip('should cancel cloud server contract');
      it.skip('should cancel dedicated server contract');
      it.skip('should cancel IP subnet contract');
    } else if (!testServerId) {
      it.skip('should cancel cloud server contract');
    } else {
      it('should cancel cloud server contract', async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const dateStr = futureDate.toISOString().split('T')[0];

        const response = await client.hosting.cancel({
          id: parseInt(testServerId),
          date: dateStr,
        });
        expect(response.code).toBe('100');
        expect(response.data.date).toBeDefined();

        await client.hosting.cancel({
          id: parseInt(testServerId),
          date: '0000-00-00',
        });
      });
    }

    if (!shouldRun) {
      it.skip('should cancel dedicated server contract');
    } else if (!testContractId) {
      it.skip('should cancel dedicated server contract');
    } else {
      it('should cancel dedicated server contract', async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const dateStr = futureDate.toISOString().split('T')[0];

        const response = await client.hosting.cancel({
          id: parseInt(testContractId),
          date: dateStr,
        });
        expect(response.code).toBe('100');
        expect(response.data.date).toBeDefined();

        await client.hosting.cancel({
          id: parseInt(testContractId),
          date: '0000-00-00',
        });
      });
    }

    if (!shouldRun) {
      it.skip('should cancel IP subnet contract');
    } else if (!testIpContractId) {
      it.skip('should cancel IP subnet contract');
    } else {
      it('should cancel IP subnet contract', async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const dateStr = futureDate.toISOString().split('T')[0];

        const response = await client.hosting.cancel({
          id: parseInt(testIpContractId),
          date: dateStr,
        });
        expect(response.code).toBe('100');
        expect(response.data.date).toBeDefined();

        await client.hosting.cancel({
          id: parseInt(testIpContractId),
          date: '0000-00-00',
        });
      });
    }
  });
});
