import { describe, it, expect, beforeAll } from 'bun:test';
import { NuxoaClient, NuxoaApiError } from '../../src/index';

describe('Dedicated Server Endpoints (Integration Tests)', () => {
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

  describe('GET /dedicated/list', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;

    if (!shouldRun) {
      it.skip('should return list of available servers');
    } else {
      it('should return list of available servers', async () => {
        const response = await client.dedicated.list();
        expect(response.code).toBe('100');
        expect(Array.isArray(response.data)).toBe(true);
        
        if (response.data.length > 0) {
          const server = response.data[0];
          expect(server.id).toBeDefined();
          expect(server.name).toBeDefined();
          expect(server.datacenter).toBeDefined();
          expect(server.cpu).toBeDefined();
          expect(server.cores).toBeDefined();
          expect(server.ram).toBeDefined();
          expect(server.storage).toBeDefined();
          expect(server.price).toBeDefined();
        }
      });
    }
  });

  describe('GET /dedicated/order', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testServerId = process.env.NUXOA_TEST_DEDICATED_SERVER_ID;

    if (!shouldRun) {
      it.skip('should order a dedicated server');
      it.skip('should throw error for invalid server ID');
    } else if (!testServerId) {
      console.warn('Skipping dedicated order tests - NUXOA_TEST_DEDICATED_SERVER_ID not set');
      it.skip('should order a dedicated server');
      it.skip('should throw error for invalid server ID');
    } else {
      it('should order a dedicated server', async () => {
        const response = await client.dedicated.order({
          id: parseInt(testServerId),
          note: 'Test order via API',
        });
        expect(response.code).toBe('100');
        expect(response.data.id).toBeDefined();
      });

      it('should throw error for invalid server ID', async () => {
        try {
          await client.dedicated.order({ id: 999999 });
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

  describe('GET /dedicated/info', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testContractId = process.env.NUXOA_TEST_DEDICATED_CONTRACT_ID;

    if (!shouldRun) {
      it.skip('should return dedicated server information');
      it.skip('should throw error for invalid contract ID');
    } else if (!testContractId) {
      console.warn('Skipping dedicated info tests - NUXOA_TEST_DEDICATED_CONTRACT_ID not set');
      it.skip('should return dedicated server information');
      it.skip('should throw error for invalid contract ID');
    } else {
      it('should return dedicated server information', async () => {
        const response = await client.dedicated.getInfo(parseInt(testContractId));
        expect(response.code).toBe('100');
        expect(response.data).toBeDefined();
        expect(response.data.name).toBeDefined();
        expect(response.data.status).toBeDefined();
        expect(response.data.description).toBeDefined();
        expect(response.data.price).toBeDefined();
      });

      it('should throw error for invalid contract ID', async () => {
        try {
          await client.dedicated.getInfo(999999);
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

  describe('GET /dedicated/set', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testContractId = process.env.NUXOA_TEST_DEDICATED_CONTRACT_ID;

    if (!shouldRun) {
      it.skip('should set note/description for dedicated server');
    } else if (!testContractId) {
      it.skip('should set note/description for dedicated server');
    } else {
      it('should set note/description for dedicated server', async () => {
        const response = await client.dedicated.setNote({
          id: parseInt(testContractId),
          note: 'Updated test note',
        });
        expect(response.code).toBe('100');
        expect(response.data).toBeDefined();
      });
    }
  });

  describe('GET /dedicated/cancel', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testContractId = process.env.NUXOA_TEST_DEDICATED_CONTRACT_ID;

    if (!shouldRun) {
      it.skip('should cancel a dedicated server contract');
    } else if (!testContractId) {
      it.skip('should cancel a dedicated server contract');
    } else {
      it('should cancel a dedicated server contract', async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const dateStr = futureDate.toISOString().split('T')[0];

        const response = await client.dedicated.cancel({
          id: parseInt(testContractId),
          date: dateStr,
        });
        expect(response.code).toBe('100');
        expect(response.data.date).toBeDefined();

        await client.dedicated.cancel({
          id: parseInt(testContractId),
          date: '0000-00-00',
        });
      });
    }
  });
});
