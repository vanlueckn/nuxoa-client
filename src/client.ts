import { CloudClient } from './endpoints/cloud.js';
import { HostingClient } from './endpoints/hosting.js';
import { DedicatedClient } from './endpoints/dedicated.js';
import { IpClient } from './endpoints/ip.js';
import { DomainClient } from './endpoints/domain.js';
import { DnsClient } from './endpoints/dns.js';
import { NuxoaApiError } from './utils/errors.js';

export interface NuxoaClientConfig {
  customerId: string;
  apiKey: string;
  baseUrl?: string;
}

export class NuxoaClient {
  public readonly cloud: CloudClient;
  public readonly hosting: HostingClient;
  public readonly dedicated: DedicatedClient;
  public readonly ip: IpClient;
  public readonly domain: DomainClient;
  public readonly dns: DnsClient;

  private readonly baseUrl: string;

  constructor(config: NuxoaClientConfig) {
    this.baseUrl = config.baseUrl ?? 'https://manager.nuxoa.de/api';

    this.cloud = new CloudClient(
      this.baseUrl,
      config.customerId,
      config.apiKey
    );

    this.hosting = new HostingClient(
      this.baseUrl,
      config.customerId,
      config.apiKey
    );

    this.dedicated = new DedicatedClient(
      this.baseUrl,
      config.customerId,
      config.apiKey
    );

    this.ip = new IpClient(
      this.baseUrl,
      config.customerId,
      config.apiKey
    );

    this.domain = new DomainClient(
      this.baseUrl,
      config.customerId,
      config.apiKey
    );

    this.dns = new DnsClient(
      this.baseUrl,
      config.customerId,
      config.apiKey
    );
  }
}

export { NuxoaApiError };
export * from './types/index.js';
