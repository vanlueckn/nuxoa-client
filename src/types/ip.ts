import { ApiResponse, SuccessResponse } from './common.js';

export interface IpInfoData {
  status: boolean;
  description: string;
  order_date: string;
  price: number;
  currency: string;
  period: string;
  next_invoice: string;
  cancellation_date: string;
  cancellation_dates: string[];
  subnet: string;
  ips: {
    net: string;
    gateway: string;
    broadcast: string;
    useable: string[];
  };
  ptr: Record<string, string>;
}

export interface IpInfoResponse extends ApiResponse {
  data: IpInfoData;
}

export interface IpTrafficResponse {
  code: string | number;
  message: string;
  data: string[];
}

export interface IpDdosResponseItem {
  ip: string;
  signatures: string;
  astart: string;
  aend: string;
}

export type IpDdosResponse = IpDdosResponseItem[];

export interface IpSetRequest {
  id: number;
  note?: string;
}

export interface IpSetResponse extends ApiResponse {
  data: {};
}

export interface IpCancelRequest {
  id: number;
  date: string;
}

export interface IpCancelResponse extends ApiResponse {
  data: {
    date: string;
  };
}
