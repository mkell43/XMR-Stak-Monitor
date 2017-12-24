import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { MINERS_GET_ALL, MinersGetAll, MinersGetAllSuccess, MinersGetAllFail } from './miners.actions';

@Injectable()
export class MinersEffects {

  @Effect()
  minersGetAll$ = this.actions$
    .ofType(MINERS_GET_ALL)
    .switchMap((action: MinersGetAll) => {

      return this.http.get<any>('/api/miners/get')
        .catch((error) => Observable.of(new MinersGetAllFail(error)))
        .map((response: any) => new MinersGetAllSuccess(response));
    });


  constructor(private actions$: Actions, private http: HttpClient) {}
}
