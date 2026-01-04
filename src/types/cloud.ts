import { ApiResponse, SuccessResponse, OperatingSystem, GraphPeriod, Price } from './common.js';

export interface CloudPricingData {
  currency: string;
  base: Price;
  cores: Price;
  ram: Price;
  storage: Price;
  snapshots: Price;
  additional_ips: Price;
}

export interface CloudPricingResponse extends ApiResponse {
  data: CloudPricingData;
}

export interface CloudOrderRequest {
  cores: number;
  ram: number;
  storage: number;
  snapshots: number;
  additional_ips: number;
  os: OperatingSystem;
  hostname?: string;
}

export interface CloudOrderResponse {
  id: number;
  price: number;
}

export interface CloudInfoData {
  status: boolean;
  ready: boolean;
  description: string;
  order_date: string;
  price: number;
  currency: string;
  period: string;
  next_invoice: string;
  cancellation_date: string;
  cancellation_dates: string[];
  online: boolean;
  hostname: string;
  ipv4: string;
  ipv4_ptr: string;
  ipv6: string | null;
  ipv6_ptr: string | null;
  ip_config: {
    ip: string;
    gw: string;
  };
  additional_ips: Array<{
    ip: string;
    mask: string;
    gw: string;
    ptr: string;
  }>;
  os: string;
  username: string;
  password: string;
  ssh_key: string;
  available_os: string[];
  resources: {
    cores: number;
    ram: number;
    storage: number;
    snapshots: number;
    additional_ips: number;
  };
  snapshots: string[];
}

export interface CloudInfoResponse extends ApiResponse {
  data: CloudInfoData;
}

export interface VncResponse {
  url: string;
}

export interface GraphsResponse {
  cpu: string;
  memory: string;
  storage: string;
  network: string;
  io: string;
}

export interface TrafficResponse {
  image_url: string;
}

export interface DdosResponseItem {
  ip: string;
  signatures: string;
  astart: string;
  aend: string;
}

export type DdosResponse = DdosResponseItem[];

export interface UpgradeRequest {
  id: number;
  cores: number;
  ram: number;
  storage: number;
  snapshots: number;
  additional_ips: number;
}

export interface UpgradeResponse {
  success: boolean;
  billed: number;
  new_price: number;
}

export interface RefundResponse {
  success: boolean;
  refund: number;
}
