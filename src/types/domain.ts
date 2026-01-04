import { ApiResponse } from './common.js';

export interface DomainContact {
  firstname: string;
  lastname: string;
  company: string;
  street: string;
  country: string;
  postcode: string;
  city: string;
  telephone: string;
  telefax: string;
  email: string;
  remarks: string;
}

export interface Domain {
  domain: string;
  recurring: number;
  created: string;
  expiration: string;
  auto_renew: boolean;
  transfer_lock: boolean;
  privacy: boolean;
  privacy_price: number;
  status: string;
  last_sync: string;
  trade: number;
  owner: DomainContact;
  admin: DomainContact;
  tech: DomainContact;
  zone: DomainContact;
  ns: string[];
}

export interface DomainListResponse extends ApiResponse {
  data: Domain[];
}

export interface DomainContactData {
  firstname: string;
  lastname: string;
  company?: string;
  street: string;
  country: string;
  postcode: string;
  city: string;
  telephone: string;
  telefax?: string;
  email: string;
}

export interface DomainRegisterRequest {
  domain: string;
  owner_firstname: string;
  owner_lastname: string;
  owner_company?: string;
  owner_street: string;
  owner_country: string;
  owner_postcode: string;
  owner_city: string;
  owner_telephone: string;
  owner_telefax?: string;
  owner_email: string;
  admin_firstname: string;
  admin_lastname: string;
  admin_company?: string;
  admin_street: string;
  admin_country: string;
  admin_postcode: string;
  admin_city: string;
  admin_telephone: string;
  admin_telefax?: string;
  admin_email: string;
  tech_firstname?: string;
  tech_lastname?: string;
  tech_company?: string;
  tech_street?: string;
  tech_country?: string;
  tech_postcode?: string;
  tech_city?: string;
  tech_telephone?: string;
  tech_telefax?: string;
  tech_email?: string;
  zone_firstname?: string;
  zone_lastname?: string;
  zone_company?: string;
  zone_street?: string;
  zone_country?: string;
  zone_postcode?: string;
  zone_city?: string;
  zone_telephone?: string;
  zone_telefax?: string;
  zone_email?: string;
  ns1: string;
  ns2: string;
  ns3?: string;
  ns4?: string;
  ns5?: string;
  ip?: string;
  async?: boolean;
}

export interface DomainTransferRequest extends DomainRegisterRequest {
  password: string;
}

export interface DomainModifyRequest extends DomainRegisterRequest {
  transfer_lock?: boolean;
  auto_renew?: boolean;
  privacy?: boolean;
}

export interface DomainModifyResponse extends ApiResponse {
  data: {};
}

export interface DomainRegisterResponse extends ApiResponse {
  data: {};
}

export interface DomainTransferResponse extends ApiResponse {
  data: {};
}

export interface DomainTradeRequest {
  domain: string;
  owner_firstname: string;
  owner_lastname: string;
  owner_company?: string;
  owner_street: string;
  owner_country: string;
  owner_postcode: string;
  owner_city: string;
  owner_telephone: string;
  owner_telefax?: string;
  owner_email: string;
  admin_firstname: string;
  admin_lastname: string;
  admin_company?: string;
  admin_street: string;
  admin_country: string;
  admin_postcode: string;
  admin_city: string;
  admin_telephone: string;
  admin_telefax?: string;
  admin_email: string;
  tech_firstname?: string;
  tech_lastname?: string;
  tech_company?: string;
  tech_street?: string;
  tech_country?: string;
  tech_postcode?: string;
  tech_city?: string;
  tech_telephone?: string;
  tech_telefax?: string;
  tech_email?: string;
  zone_firstname?: string;
  zone_lastname?: string;
  zone_company?: string;
  zone_street?: string;
  zone_country?: string;
  zone_postcode?: string;
  zone_city?: string;
  zone_telephone?: string;
  zone_telefax?: string;
  zone_email?: string;
  async?: boolean;
}

export interface DomainTradeResponse extends ApiResponse {
  data: {};
}

export interface DomainPasswordResponse extends ApiResponse {
  data: {
    code: string;
  };
}

export interface DomainDeleteRequest {
  domain: string;
  type: 0 | 1 | 2;
}

export interface DomainDeleteResponse extends ApiResponse {
  data: {};
}
