import { ApiResponse } from './common.js';

export interface DnsListResponse extends ApiResponse {
  data: string[];
}

export interface DnsRecord {
  name: string;
  type: string;
  content: string;
  ttl: number;
  priority: number;
}

export interface DnsShowResponse extends ApiResponse {
  data: Record<string, DnsRecord>;
}

export interface DnsAddRequest {
  domain: string;
  name: string;
  type: string;
  content: string;
  ttl: number;
  priority: number;
}

export interface DnsAddResponse extends ApiResponse {
  data: {};
}

export interface DnsEditRequest {
  domain: string;
  record: string;
  name: string;
  type: string;
  content: string;
  ttl: number;
  priority: number;
}

export interface DnsEditResponse extends ApiResponse {
  data: {};
}

export interface DnsDeleteRequest {
  domain: string;
  record: string;
}

export interface DnsDeleteResponse extends ApiResponse {
  data: {};
}
