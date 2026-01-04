import { makeRequest } from '../utils/request.js';
import type {
  DnsListResponse,
  DnsShowResponse,
  DnsAddRequest,
  DnsAddResponse,
  DnsEditRequest,
  DnsEditResponse,
  DnsDeleteRequest,
  DnsDeleteResponse,
} from '../types/dns.js';

export class DnsClient {
  constructor(
    private baseUrl: string,
    private customerId: string,
    private apiKey: string
  ) {}

  async list(domain?: string): Promise<DnsListResponse> {
    return makeRequest<DnsListResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'dns',
      'list',
      domain ? { domain } : undefined
    );
  }

  async show(domain: string): Promise<DnsShowResponse> {
    return makeRequest<DnsShowResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'dns',
      'show',
      { domain }
    );
  }

  async add(request: DnsAddRequest): Promise<DnsAddResponse> {
    return makeRequest<DnsAddResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'dns',
      'add',
      request
    );
  }

  async edit(request: DnsEditRequest): Promise<DnsEditResponse> {
    return makeRequest<DnsEditResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'dns',
      'edit',
      request
    );
  }

  async delete(request: DnsDeleteRequest): Promise<DnsDeleteResponse> {
    return makeRequest<DnsDeleteResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'dns',
      'delete',
      request
    );
  }
}
