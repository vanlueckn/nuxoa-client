import { describe, it, expect } from 'bun:test';
import { NuxoaClient, NuxoaApiError } from '../src/index';

describe('NuxoaClient', () => {
  it('should create a client with credentials', () => {
    const client = new NuxoaClient({
      customerId: 'test-customer',
      apiKey: 'test-key',
    });

    expect(client).toBeDefined();
    expect(client.cloud).toBeDefined();
    expect(client.hosting).toBeDefined();
    expect(client.dedicated).toBeDefined();
    expect(client.ip).toBeDefined();
    expect(client.domain).toBeDefined();
    expect(client.dns).toBeDefined();
  });

  it('should allow custom base URL', () => {
    const client = new NuxoaClient({
      customerId: 'test-customer',
      apiKey: 'test-key',
      baseUrl: 'https://custom.api.com/api',
    });

    expect(client).toBeDefined();
  });
});

describe('NuxoaApiError', () => {
  it('should create an error with code and message', () => {
    const error = new NuxoaApiError(800, 'Authorization failed');

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('NuxoaApiError');
    expect(error.code).toBe(800);
    expect(error.message).toBe('Authorization failed');
  });

  it('should accept optional data', () => {
    const data = { field: 'value' };
    const error = new NuxoaApiError(800, 'Authorization failed', data);

    expect(error.data).toEqual(data);
  });
});
