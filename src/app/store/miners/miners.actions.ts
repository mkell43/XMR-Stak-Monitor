import { Action } from '@ngrx/store';
import { IMiners,IAllMinersResult } from './miners.reducer';

export const MINERS_GET_ALL = '[Miners Get All] Get';
export const MINERS_GET_ALL_SUCCESS = '[Miners Get All] Success';
export const Miners_GET_ALL_FAIL = '[Miners Get All] Fail'

export class MinersGetAll implements Action{
  readonly type = MINERS_GET_ALL;

  constructor(public payload:string){}
}

export class MinersGetAllSuccess implements Action{
  readonly type = MINERS_GET_ALL_SUCCESS;
  constructor(public payload: IAllMinersResult){};
}

export class MinersGetAllFail implements Action{
  readonly type = Miners_GET_ALL_FAIL;
  constructor(public payload: IMiners){};
}


export type Actions =
  MinersGetAll
  | MinersGetAllSuccess
  | MinersGetAllFail;
