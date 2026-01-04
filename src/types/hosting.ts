import { ApiResponse } from './common.js';

export interface SetNoteRequest {
  id: number;
  note?: string;
}

export interface SetNoteResponse extends ApiResponse {
  data: {};
}

export interface CancelRequest {
  id: number;
  date: string;
}

export interface CancelResponse extends ApiResponse {
  data: {
    date: string;
  };
}
