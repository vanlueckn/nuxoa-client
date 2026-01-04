import { makeRequest } from '../utils/request.js';
import type {
  IpInfoResponse,
  IpTrafficResponse,
  IpDdosResponse,
  IpSetRequest,
  IpSetResponse,
  IpCancelRequest,
  IpCancelResponse,
} from '../types/ip.js';
import type { SuccessResponse } from '../types/common.js';

export class IpClient {
  constructor(
    private baseUrl: string,
    private customerId: string,
    private apiKey: string
  ) {}

  async getInfo(id: number): Promise<IpInfoResponse> {
    return makeRequest<IpInfoResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'ip',
      'info',
      { id }
    );
  }

  async setPtr(id: number, ip: string, ptr: string): Promise<SuccessResponse> {
    return makeRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'ip',
      'ptr',
      { id, ip, ptr }
    );
  }

  async getTraffic(id: number, from: number, to: number): Promise<IpTrafficResponse> {
    return makeRequest<IpTrafficResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'ip',
      'traffic',
      { id, from, to }
    );
  }

  async getDdos(id: number): Promise<IpDdosResponse> {
    return makeRequest<IpDdosResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'ip',
      'ddos',
      { id }
    );
  }

  async setNote(request: IpSetRequest): Promise<IpSetResponse> {
    return makeRequest<IpSetResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'ip',
      'set',
      request
    );
  }

  async cancel(request: IpCancelRequest): Promise<IpCancelResponse> {
    return makeRequest<IpCancelResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'ip',
      'cancel',
      request
    );
  }
}
