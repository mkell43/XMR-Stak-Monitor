import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MINERS_GET_ALL } from '../store/miners/miners.actions';
import { IAppState } from '../store';
import { IXmrStakApiResponse } from '../../typings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  rollup = [];
  miners$: Observable<{}>;
  self = this;
  constructor(public store: Store<IAppState>, private ref: ChangeDetectorRef) {

    this.miners$ = store.select('miners');
  }

  ngOnInit() {
  }

  
  minerUpdated(miner: IXmrStakApiResponse) {
    if (miner.result == "success") {
      var index = this.rollup.findIndex((item) => item.minerName == miner.minerName);

      if (index !== -1) {
        this.rollup.splice(index, 1);

      }
      this.rollup.push({
        "minerName": miner.minerName,
        hashRateTotals: miner.data.hashrate.total.slice(0),
        errors: miner.data.results.error_log.length
      });

      index = this.rollup.findIndex((item) => item.minerName == "Total");
      if (index !== -1) {
        this.rollup.splice(index, 1);
      }

      var total = {
        "minerName": "Total",
        hashRateTotals: [],
        errors: 0
      };

      var accumulator0 = 0;
      var accumulator1 = 0;
      var accumulator2 = 0;
      var accumulator3 = 0;
      for (let miner of this.rollup) {
        accumulator0 += miner.hashRateTotals[0];
        accumulator1 += miner.hashRateTotals[1]
        accumulator2 += miner.hashRateTotals[2]
        accumulator3 += miner.errors;
      }
      total.hashRateTotals = [accumulator0, accumulator1, accumulator2];
      total.errors = accumulator3;

      this.rollup.push(total);

      this.ref.markForCheck();
    }
  }
}
