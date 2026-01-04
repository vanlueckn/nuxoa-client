import { describe, it, expect, beforeAll } from 'bun:test';
import { NuxoaClient, NuxoaApiError } from '../../src/index';

describe('Domain Endpoints (Integration Tests)', () => {
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

  describe('GET /domain/list', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;

    if (!shouldRun) {
      it.skip('should return list of domains');
      it.skip('should filter domains by wildcard');
    } else {
      it('should return list of domains', async () => {
        const response = await client.domain.list();
        expect(response.code).toBe('100');
        expect(Array.isArray(response.data)).toBe(true);
        
        if (response.data.length > 0) {
          const domain = response.data[0];
          expect(domain.domain).toBeDefined();
          expect(domain.created).toBeDefined();
          expect(domain.expiration).toBeDefined();
          expect(domain.status).toBeDefined();
          expect(domain.ns).toBeDefined();
          expect(domain.owner).toBeDefined();
          expect(domain.admin).toBeDefined();
        }
      });

      it('should filter domains by wildcard', async () => {
        const response = await client.domain.list('example*');
        expect(response.code).toBe('100');
        expect(Array.isArray(response.data)).toBe(true);
      });
    }
  });

  describe('GET /domain/register', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testRegisterDomain = process.env.NUXOA_TEST_REGISTER_DOMAIN;

    if (!shouldRun) {
      it.skip('should register a new domain');
    } else if (!testRegisterDomain) {
      it.skip('should register a new domain');
    } else {
      it('should register a new domain', async () => {
        const response = await client.domain.register({
          domain: process.env.NUXOA_TEST_REGISTER_DOMAIN,
          owner_firstname: 'John',
          owner_lastname: 'Doe',
          owner_street: '123 Main St',
          owner_country: 'US',
          owner_postcode: '12345',
          owner_city: 'New York',
          owner_telephone: '+1-555-123-4567',
          owner_email: 'john@example.com',
          admin_firstname: 'Jane',
          admin_lastname: 'Doe',
          admin_street: '456 Oak Ave',
          admin_country: 'US',
          admin_postcode: '67890',
          admin_city: 'Los Angeles',
          admin_telephone: '+1-555-987-6543',
          admin_email: 'jane@example.com',
          ns1: 'ns1.example.com',
          ns2: 'ns2.example.com',
          async: false,
        });
        expect(response.code).toBe('100');
      });
    }
  });

  describe('GET /domain/transfer', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testTransferDomain = process.env.NUXOA_TEST_TRANSFER_DOMAIN;
    const testTransferAuthcode = process.env.NUXOA_TEST_TRANSFER_AUTHCODE;

    if (!shouldRun) {
      it.skip('should transfer a domain');
    } else if (!testTransferDomain || !testTransferAuthcode) {
      it.skip('should transfer a domain');
    } else {
      it('should transfer a domain', async () => {
        const response = await client.domain.transfer({
          domain: process.env.NUXOA_TEST_TRANSFER_DOMAIN,
          password: process.env.NUXOA_TEST_TRANSFER_AUTHCODE,
          owner_firstname: 'John',
          owner_lastname: 'Doe',
          owner_street: '123 Main St',
          owner_country: 'US',
          owner_postcode: '12345',
          owner_city: 'New York',
          owner_telephone: '+1-555-123-4567',
          owner_email: 'john@example.com',
          admin_firstname: 'Jane',
          admin_lastname: 'Doe',
          admin_street: '456 Oak Ave',
          admin_country: 'US',
          admin_postcode: '67890',
          admin_city: 'Los Angeles',
          admin_telephone: '+1-555-987-6543',
          admin_email: 'jane@example.com',
          ns1: 'ns1.example.com',
          ns2: 'ns2.example.com',
          async: false,
        });
        expect(response.code).toBe('100');
      });
    }
  });

  describe('GET /domain/modify', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testModifyDomain = process.env.NUXOA_TEST_MODIFY_DOMAIN;

    if (!shouldRun) {
      it.skip('should modify domain settings');
    } else if (!testModifyDomain) {
      console.warn('Skipping domain modify test - NUXOA_TEST_MODIFY_DOMAIN not set');
      it.skip('should modify domain settings');
    } else {
      it('should modify domain settings', async () => {
        const response = await client.domain.modify({
          domain: testModifyDomain,
          owner_firstname: 'John',
          owner_lastname: 'Doe',
          owner_street: '123 Main St',
          owner_country: 'US',
          owner_postcode: '12345',
          owner_city: 'New York',
          owner_telephone: '+1-555-123-4567',
          owner_email: 'john@example.com',
          admin_firstname: 'Jane',
          admin_lastname: 'Doe',
          admin_street: '456 Oak Ave',
          admin_country: 'US',
          admin_postcode: '67890',
          admin_city: 'Los Angeles',
          admin_telephone: '+1-555-987-6543',
          admin_email: 'jane@example.com',
          ns1: 'ns1.example.com',
          ns2: 'ns2.example.com',
          auto_renew: true,
          transfer_lock: true,
        });
        expect(response.code).toBe('100');
      });
    }
  });

  describe('GET /domain/trade', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testTradeDomain = process.env.NUXOA_TEST_TRADE_DOMAIN;

    if (!shouldRun) {
      it.skip('should change domain owner (trade)');
    } else if (!testTradeDomain) {
      console.warn('Skipping domain trade test - NUXOA_TEST_TRADE_DOMAIN not set');
      it.skip('should change domain owner (trade)');
    } else {
      it('should change domain owner (trade)', async () => {
        const response = await client.domain.trade({
          domain: testTradeDomain,
          owner_firstname: 'New',
          owner_lastname: 'Owner',
          owner_street: '789 Pine Rd',
          owner_country: 'US',
          owner_postcode: '54321',
          owner_city: 'Chicago',
          owner_telephone: '+1-555-111-2222',
          owner_email: 'new@example.com',
          admin_firstname: 'New',
          admin_lastname: 'Admin',
          admin_street: '321 Elm St',
          admin_country: 'US',
          admin_postcode: '98765',
          admin_city: 'Houston',
          admin_telephone: '+1-555-333-4444',
          admin_email: 'admin@example.com',
          async: false,
        });
        expect(response.code).toBe('100');
      });
    }
  });

  describe('GET /domain/password', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testPasswordDomain = process.env.NUXOA_TEST_PASSWORD_DOMAIN;

    if (!shouldRun) {
      it.skip('should request authcode');
    } else if (!testPasswordDomain) {
      console.warn('Skipping domain password test - NUXOA_TEST_PASSWORD_DOMAIN not set');
      it.skip('should request authcode');
    } else {
      it('should request authcode', async () => {
        const response = await client.domain.getPassword(testPasswordDomain);
        expect(response.code).toBe('100');
        expect(response.data.code).toBeDefined();
      });
    }
  });

  describe('GET /domain/delete', () => {
    const shouldRun = process.env.NUXOA_CUSTOMER_ID && process.env.NUXOA_API_KEY;
    const testDeleteDomain = process.env.NUXOA_TEST_DELETE_DOMAIN;

    if (!shouldRun) {
      it.skip('should delete/return a domain');
    } else if (!testDeleteDomain) {
      console.warn('Skipping domain delete test - NUXOA_TEST_DELETE_DOMAIN not set');
      it.skip('should delete/return a domain');
    } else {
      it('should delete/return a domain', async () => {
        const response = await client.domain.delete({
          domain: testDeleteDomain,
          type: 0,
        });
        expect(response.code).toBe('100');
      });
    }
  });
});
