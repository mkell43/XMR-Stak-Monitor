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
        errors: miner.data.results.error_log.length,
        sharesGood: miner.data.results.shares_good,
        sharesTotal: miner.data.results.shares_total
      });

      index = this.rollup.findIndex((item) => item.minerName == "Total");
      if (index !== -1) {
        this.rollup.splice(index, 1);
      }

      var total = {
        "minerName": "Total",
        hashRateTotals: [],
        errors: 0,
        sharesGood:0,
        sharesTotal:0
      };

      var accumulator0 = 0,
       accumulator1 = 0,
       accumulator2 = 0,
       accumulator3 = 0,
       accumulator4 = 0,
       accumulator5 = 0

      for (let miner of this.rollup) {
        accumulator0 += miner.hashRateTotals[0];
        accumulator1 += miner.hashRateTotals[1]
        accumulator2 += miner.hashRateTotals[2]
        accumulator3 += miner.errors;
        accumulator4 += miner.sharesGood,
        accumulator5 += miner.sharesTotal
      }
      total.sharesGood = accumulator4;
      total.sharesTotal = accumulator5;
      total.hashRateTotals = [accumulator0, accumulator1, accumulator2];
      total.errors = accumulator3;

      this.rollup.push(total);

      this.ref.markForCheck();
    }
  }
}
