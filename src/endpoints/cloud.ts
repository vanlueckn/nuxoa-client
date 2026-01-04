import { makeRequest, makePostRequest } from '../utils/request.js';
import type {
  CloudPricingResponse,
  CloudOrderRequest,
  CloudOrderResponse,
  CloudInfoResponse,
  VncResponse,
  GraphsResponse,
  TrafficResponse,
  DdosResponse,
  UpgradeRequest,
  UpgradeResponse,
  RefundResponse,
} from '../types/cloud.js';
import type { SuccessResponse } from '../types/common.js';

export class CloudClient {
  constructor(
    private baseUrl: string,
    private customerId: string,
    private apiKey: string
  ) {}

  async getPricing(): Promise<CloudPricingResponse> {
    return makeRequest<CloudPricingResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'pricing'
    );
  }

  async order(request: CloudOrderRequest): Promise<CloudOrderResponse> {
    return makeRequest<CloudOrderResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'order',
      request
    );
  }

  async getInfo(id: number): Promise<CloudInfoResponse> {
    return makeRequest<CloudInfoResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'info',
      { id }
    );
  }

  async start(id: number): Promise<SuccessResponse> {
    return makeRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'start',
      { id }
    );
  }

  async reboot(id: number): Promise<SuccessResponse> {
    return makeRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'reboot',
      { id }
    );
  }

  async shutdown(id: number): Promise<SuccessResponse> {
    return makeRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'shutdown',
      { id }
    );
  }

  async reinstall(id: number, os: string): Promise<SuccessResponse> {
    return makeRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'reinstall',
      { id, os }
    );
  }

  async resetPassword(id: number): Promise<SuccessResponse> {
    return makeRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'password',
      { id }
    );
  }

  async authorizeSshKey(id: number, key: string): Promise<SuccessResponse> {
    return makePostRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'key',
      { id, key }
    );
  }

  async setHostname(id: number, hostname: string): Promise<SuccessResponse> {
    return makeRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'hostname',
      { id, hostname }
    );
  }

  async setPtr(id: number, ip: string, ptr: string): Promise<SuccessResponse> {
    return makeRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'ptr',
      { id, ip, ptr }
    );
  }

  async getVnc(id: number): Promise<VncResponse> {
    return makeRequest<VncResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'vnc',
      { id }
    );
  }

  async getGraphs(id: number, period: 'hour' | 'day' | 'week' | 'month' | 'year' = 'day'): Promise<GraphsResponse> {
    return makeRequest<GraphsResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'graphs',
      { id, period }
    );
  }

  async getTraffic(id: number, from: number, to: number): Promise<TrafficResponse> {
    return makeRequest<TrafficResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'traffic',
      { id, from, to }
    );
  }

  async getDdos(id: number): Promise<DdosResponse> {
    return makeRequest<DdosResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'ddos',
      { id }
    );
  }

  async createSnapshot(id: number): Promise<SuccessResponse> {
    return makeRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'snapshot',
      { id }
    );
  }

  async restoreSnapshot(id: number, snapshot: string): Promise<SuccessResponse> {
    return makeRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'rollback',
      { id, snapshot }
    );
  }

  async deleteSnapshot(id: number, snapshot: string): Promise<SuccessResponse> {
    return makeRequest<SuccessResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'delsnap',
      { id, snapshot }
    );
  }

  async upgrade(request: UpgradeRequest): Promise<UpgradeResponse> {
    return makeRequest<UpgradeResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'upgrade',
      request
    );
  }

  async requestRefund(id: number): Promise<RefundResponse> {
    return makeRequest<RefundResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'cloud',
      'refund',
      { id }
    );
  }
}
