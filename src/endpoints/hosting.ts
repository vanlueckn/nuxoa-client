import { makeRequest } from '../utils/request.js';
import type { SetNoteRequest, SetNoteResponse, CancelRequest, CancelResponse } from '../types/hosting.js';

export class HostingClient {
  constructor(
    private baseUrl: string,
    private customerId: string,
    private apiKey: string
  ) {}

  async setNote(request: SetNoteRequest): Promise<SetNoteResponse> {
    return makeRequest<SetNoteResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'hosting',
      'set',
      request
    );
  }

  async cancel(request: CancelRequest): Promise<CancelResponse> {
    return makeRequest<CancelResponse>(
      this.baseUrl,
      this.customerId,
      this.apiKey,
      'hosting',
      'cancel',
      request
    );
  }
}
