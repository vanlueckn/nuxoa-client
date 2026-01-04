import { describe, it, expect, beforeAll } from 'bun:test';
import { NuxoaClient, NuxoaApiError } from '../../src/index';

describe('DNS Zone Endpoints (Integration Tests)', () => {
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

  describe('GET /dns/list', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;

    if (!shouldRun) {
      it.skip('should return list of DNS zones');
      it.skip('should filter zones by wildcard');
    } else {
      it('should return list of DNS zones', async () => {
        const response = await client.dns.list();
        expect(response.code).toBe('100');
        expect(Array.isArray(response.data)).toBe(true);
      });

      it('should filter zones by wildcard', async () => {
        const response = await client.dns.list('example*');
        expect(response.code).toBe('100');
        expect(Array.isArray(response.data)).toBe(true);
      });
    }
  });

  describe('GET /dns/show', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testDomain = process.env.NUXOA_TEST_DNS_DOMAIN;

    if (!shouldRun) {
      it.skip('should return DNS zone records');
      it.skip('should throw error for invalid domain');
    } else if (!testDomain) {
      console.warn('Skipping DNS show tests - NUXOA_TEST_DNS_DOMAIN not set');
      it.skip('should return DNS zone records');
      it.skip('should throw error for invalid domain');
    } else {
      it('should return DNS zone records', async () => {
        const response = await client.dns.show(testDomain);
        expect(response.code).toBe('100');
        expect(response.data).toBeDefined();
        expect(typeof response.data).toBe('object');
      });

      it('should throw error for invalid domain', async () => {
        try {
          await client.dns.show('invalid-domain-that-does-not-exist-12345.com');
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

  describe('GET /dns/add', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testDomain = process.env.NUXOA_TEST_DNS_DOMAIN;

    if (!shouldRun) {
      it.skip('should add a DNS record');
    } else if (!testDomain) {
      it.skip('should add a DNS record');
    } else {
      it('should add a DNS record', async () => {
        const response = await client.dns.add({
          domain: testDomain,
          name: 'test-record',
          type: 'A',
          content: '1.2.3.4',
          ttl: 3600,
          priority: 0,
        });
        expect(response.code).toBe('100');
      });
    }
  });

  describe('GET /dns/edit', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testDomain = process.env.NUXOA_TEST_DNS_DOMAIN;
    const testRecordId = process.env.NUXOA_TEST_DNS_RECORD_ID;

    if (!shouldRun) {
      it.skip('should edit a DNS record');
      it.skip('should throw error for invalid record ID');
    } else if (!testDomain) {
      it.skip('should edit a DNS record');
      it.skip('should throw error for invalid record ID');
    } else if (!testRecordId) {
      console.warn('Skipping DNS edit tests - NUXOA_TEST_DNS_RECORD_ID not set');
      it.skip('should edit a DNS record');
      it.skip('should throw error for invalid record ID');
    } else {
      it('should edit a DNS record', async () => {
        const response = await client.dns.edit({
          domain: testDomain,
          record: testRecordId,
          name: 'test-record',
          type: 'A',
          content: '5.6.7.8',
          ttl: 3600,
          priority: 0,
        });
        expect(response.code).toBe('100');
      });

      it('should throw error for invalid record ID', async () => {
        try {
          await client.dns.edit({
            domain: testDomain,
            record: 'invalid-record-id-12345',
            name: 'test',
            type: 'A',
            content: '1.2.3.4',
            ttl: 3600,
            priority: 0,
          });
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBeInstanceOf(NuxoaApiError);
          if (error instanceof NuxoaApiError) {
            expect(error.code).toBe(806);
          }
        }
      });
    }
  });

  describe('GET /dns/delete', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testDomain = process.env.NUXOA_TEST_DNS_DOMAIN;
    const testRecordId = process.env.NUXOA_TEST_DNS_RECORD_ID;

    if (!shouldRun) {
      it.skip('should delete a DNS record');
      it.skip('should throw error for invalid record ID');
    } else if (!testDomain) {
      it.skip('should delete a DNS record');
      it.skip('should throw error for invalid record ID');
    } else if (!testRecordId) {
      console.warn('Skipping DNS delete tests - NUXOA_TEST_DNS_RECORD_ID not set');
      it.skip('should delete a DNS record');
      it.skip('should throw error for invalid record ID');
    } else {
      it('should delete a DNS record', async () => {
        const response = await client.dns.delete({
          domain: testDomain,
          record: testRecordId,
        });
        expect(response.code).toBe('100');
      });

      it('should throw error for invalid record ID', async () => {
        try {
          await client.dns.delete({
            domain: testDomain,
            record: 'invalid-record-id-12345',
          });
          expect(true).toBe(false);
        } catch (error) {
          expect(error).toBeInstanceOf(NuxoaApiError);
          if (error instanceof NuxoaApiError) {
            expect(error.code).toBe(806);
          }
        }
      });
    }
  });
});
