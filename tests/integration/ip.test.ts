import { describe, it, expect, beforeAll } from 'bun:test';
import { NuxoaClient, NuxoaApiError } from '../../src/index';

describe('IP Subnet Endpoints (Integration Tests)', () => {
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

  describe('GET /ip/info', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testContractId = process.env.NUXOA_TEST_IP_CONTRACT_ID;

    if (!shouldRun) {
      it.skip('should return IP subnet information');
      it.skip('should throw error for invalid contract ID');
    } else if (!testContractId) {
      console.warn('Skipping IP info tests - NUXOA_TEST_IP_CONTRACT_ID not set');
      it.skip('should return IP subnet information');
      it.skip('should throw error for invalid contract ID');
    } else {
      it('should return IP subnet information', async () => {
        const response = await client.ip.getInfo(parseInt(testContractId));
        expect(response.code).toBe('100');
        expect(response.data).toBeDefined();
        expect(response.data.subnet).toBeDefined();
        expect(response.data.ips).toBeDefined();
        expect(response.data.ips.gateway).toBeDefined();
        expect(response.data.ips.useable).toBeDefined();
        expect(response.data.ptr).toBeDefined();
      });

      it('should throw error for invalid contract ID', async () => {
        try {
          await client.ip.getInfo(999999);
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

  describe('GET /ip/ptr', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testContractId = process.env.NUXOA_TEST_IP_CONTRACT_ID;

    if (!shouldRun) {
      it.skip('should set reverse DNS (PTR) record');
    } else if (!testContractId) {
      it.skip('should set reverse DNS (PTR) record');
    } else {
      it('should set reverse DNS (PTR) record', async () => {
        const response = await client.ip.setPtr(
          parseInt(testContractId),
          '1.2.3.4',
          'ptr.example.com'
        );
        expect(response.success).toBeDefined();
      });
    }
  });

  describe('GET /ip/traffic', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testContractId = process.env.NUXOA_TEST_IP_CONTRACT_ID;

    if (!shouldRun) {
      it.skip('should return traffic graphs');
    } else if (!testContractId) {
      it.skip('should return traffic graphs');
    } else {
      it('should return traffic graphs', async () => {
        const now = Math.floor(Date.now() / 1000);
        const oneDayAgo = now - 86400;

        const response = await client.ip.getTraffic(parseInt(testContractId), oneDayAgo, now);
        expect(response.data).toBeDefined();
        expect(Array.isArray(response.data)).toBe(true);
      });
    }
  });

  describe('GET /ip/ddos', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testContractId = process.env.NUXOA_TEST_IP_CONTRACT_ID;

    if (!shouldRun) {
      it.skip('should return DDoS attacks');
    } else if (!testContractId) {
      it.skip('should return DDoS attacks');
    } else {
      it('should return DDoS attacks', async () => {
        const response = await client.ip.getDdos(parseInt(testContractId));
        expect(Array.isArray(response)).toBe(true);
      });
    }
  });

  describe('GET /ip/set', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testContractId = process.env.NUXOA_TEST_IP_CONTRACT_ID;

    if (!shouldRun) {
      it.skip('should set note/description for IP subnet');
    } else if (!testContractId) {
      it.skip('should set note/description for IP subnet');
    } else {
      it('should set note/description for IP subnet', async () => {
        const response = await client.ip.setNote({
          id: parseInt(testContractId),
          note: 'Updated IP test note',
        });
        expect(response.code).toBe('100');
        expect(response.data).toBeDefined();
      });
    }
  });

  describe('GET /ip/cancel', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testContractId = process.env.NUXOA_TEST_IP_CONTRACT_ID;

    if (!shouldRun) {
      it.skip('should cancel an IP subnet contract');
    } else if (!testContractId) {
      it.skip('should cancel an IP subnet contract');
    } else {
      it('should cancel an IP subnet contract', async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const dateStr = futureDate.toISOString().split('T')[0];

        const response = await client.ip.cancel({
          id: parseInt(testContractId),
          date: dateStr,
        });
        expect(response.code).toBe('100');
        expect(response.data.date).toBeDefined();

        await client.ip.cancel({
          id: parseInt(testContractId),
          date: '0000-00-00',
        });
      });
    }
  });
});
