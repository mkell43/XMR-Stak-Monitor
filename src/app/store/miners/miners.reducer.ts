import { Actions, MINERS_GET_ALL_SUCCESS } from './miners.actions';

export interface IMiners {
  name:string;
  url:string;
  username?:string;
  password?:string;
}

export interface IAllMinersResult{
  miners:IMiners[];
}


export function minersReducer(state: IMiners | IMiners[], action: Actions): IMiners | IMiners[] {

  switch (action.type) {

    case MINERS_GET_ALL_SUCCESS:
    
    return Object.assign({}, action.payload).miners;
  
    default:
      return state;
  }
}
