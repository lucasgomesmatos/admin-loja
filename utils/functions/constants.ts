export const CONSTANTS = {
  POR_PAGES_MAX_8: 8,
  POR_PAGES_MAX_12: 12,
  POR_PAGES_MAX_16: 16,

} as const;


export interface StateRequest {
  data: any;
  ok: boolean;
  error: string | null;
}

export const INITIAL_STATE_NOTIFICATION: StateRequest = {
  data: null,
  ok: false,
  error: ""
}