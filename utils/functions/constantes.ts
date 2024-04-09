
export interface StateRequest {
  data: any;
  ok: boolean;
  error: string;

}

export const INITIAL_STATE_NOTIFICATION: StateRequest = {
  data: null,
  ok: false,
  error: ""
}