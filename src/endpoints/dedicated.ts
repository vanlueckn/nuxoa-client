import { makeRequest } from '../utils/request.js';
import type {
  DedicatedListResponse,
  DedicatedOrderRequest,
  DedicatedOrderResponse,
  DedicatedInfoResponse,
  DedicatedSetRequest,
  DedicatedSetResponse,
  DedicatedCancelRequest,
  DedicatedCancelResponse,
} from '../types/dedicated.js';

export class DedicatedClient {
  constructor(
    private baseUrl: string,
    private customerId: string,
    private apiKey: string
  ) {}

  async list(): Promise<DedicatedListResponse> {
    return makeRequest<DedicatedListResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'dedicated',
      'list'
    );
  }

  async order(request: DedicatedOrderRequest): Promise<DedicatedOrderResponse> {
    return makeRequest<DedicatedOrderResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'dedicated',
      'order',
      request
    );
  }

  async getInfo(id: number): Promise<DedicatedInfoResponse> {
    return makeRequest<DedicatedInfoResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'dedicated',
      'info',
      { id }
    );
  }

  async setNote(request: DedicatedSetRequest): Promise<DedicatedSetResponse> {
    return makeRequest<DedicatedSetResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'dedicated',
      'set',
      request
    );
  }

  async cancel(request: DedicatedCancelRequest): Promise<DedicatedCancelResponse> {
    return makeRequest<DedicatedCancelResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'dedicated',
      'cancel',
      request
    );
  }
}
