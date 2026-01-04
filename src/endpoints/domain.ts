import { makeRequest, makePostRequest } from '../utils/request.js';
import type {
  DomainListResponse,
  DomainRegisterRequest,
  DomainRegisterResponse,
  DomainTransferRequest,
  DomainTransferResponse,
  DomainModifyRequest,
  DomainModifyResponse,
  DomainTradeRequest,
  DomainTradeResponse,
  DomainPasswordResponse,
  DomainDeleteRequest,
  DomainDeleteResponse,
} from '../types/domain.js';

export class DomainClient {
  constructor(
    private baseUrl: string,
    private customerId: string,
    private apiKey: string
  ) {}

  async list(domain?: string): Promise<DomainListResponse> {
    return makeRequest<DomainListResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'domain',
      'list',
      domain ? { domain } : undefined
    );
  }

  async register(request: DomainRegisterRequest): Promise<DomainRegisterResponse> {
    return makeRequest<DomainRegisterResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'domain',
      'register',
      request
    );
  }

  async transfer(request: DomainTransferRequest): Promise<DomainTransferResponse> {
    return makeRequest<DomainTransferResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'domain',
      'transfer',
      request
    );
  }

  async modify(request: DomainModifyRequest): Promise<DomainModifyResponse> {
    return makeRequest<DomainModifyResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'domain',
      'modify',
      request
    );
  }

  async trade(request: DomainTradeRequest): Promise<DomainTradeResponse> {
    return makeRequest<DomainTradeResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'domain',
      'trade',
      request
    );
  }

  async getPassword(domain: string): Promise<DomainPasswordResponse> {
    return makeRequest<DomainPasswordResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'domain',
      'password',
      { domain }
    );
  }

  async delete(request: DomainDeleteRequest): Promise<DomainDeleteResponse> {
    return makeRequest<DomainDeleteResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'domain',
      'delete',
      request
    );
  }
}
