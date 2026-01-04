import { ApiResponse } from './common.js';

export interface DedicatedServer {
  id: number;
  name: string;
  datacenter: string;
  cpu: string;
  cores: number;
  threads: number;
  base_speed: number;
  turbo_speed: number;
  ram: string;
  storage: string;
  network: string;
  price: number;
}

export interface DedicatedListResponse extends ApiResponse {
  data: DedicatedServer[];
}

export interface DedicatedOrderRequest {
  id: number;
  note?: string;
}

export interface DedicatedOrderResponse extends ApiResponse {
  data: {
    id: number;
  };
}

export interface DedicatedInfoData {
  name: string;
  status: boolean;
  description: string;
  order_date: string;
  product: number;
  price: number;
  period: string;
  next_invoice: string;
  contract_time: string;
  notification_period: string;
  cancellation_date: string;
  login_data: any[];
  tasks: any[];
  output: string;
}

export interface DedicatedInfoResponse extends ApiResponse {
  data: DedicatedInfoData;
}

export interface DedicatedSetRequest {
  id: number;
  note?: string;
}

export interface DedicatedSetResponse extends ApiResponse {
  data: string;
}

export interface DedicatedCancelRequest {
  id: number;
  date: string;
}

export interface DedicatedCancelResponse extends ApiResponse {
  data: {
    date: string;
  };
}
