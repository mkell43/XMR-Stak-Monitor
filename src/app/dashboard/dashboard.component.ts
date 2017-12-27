import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MINERS_GET_ALL } from '../store/miners/miners.actions';
import { IAppState } from '../store';
import { IXmrStakApiResponse, IXmrStakError } from '../../typings';

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
        errors: miner.data.results.error_log.reduce((total: any, current: IXmrStakError) => {
          return total + current.count;
        }, 0),
        sharesGood: miner.data.results.shares_good,
        sharesTotal: miner.data.results.shares_total,
        uptime: miner.data.connection.uptime,
        uptimeToString: this.convertUptimeToString(miner.data.connection.uptime),
        ping: miner.data.connection.ping
      });

      index = this.rollup.findIndex((item) => item.minerName == "Total");
      if (index !== -1) {
        this.rollup.splice(index, 1);
      }

      var total = {
        "minerName": "Total",
        hashRateTotals: [],
        errors: 0,
        sharesGood: 0,
        sharesTotal: 0,
        uptimeToString: ""
      };

      var accumulator0 = 0,
        accumulator1 = 0,
        accumulator2 = 0,
        accumulator3 = 0,
        accumulator4 = 0,
        accumulator5 = 0,
        accumulator6 = 0;

      for (let miner of this.rollup) {
        accumulator0 += miner.hashRateTotals[0];
        accumulator1 += miner.hashRateTotals[1]
        accumulator2 += miner.hashRateTotals[2]
        accumulator3 += miner.errors;
        accumulator4 += miner.sharesGood;
        accumulator5 += miner.sharesTotal;
        accumulator6 += miner.uptime;
      }
      total.sharesGood = accumulator4;
      total.sharesTotal = accumulator5;
      total.hashRateTotals = [accumulator0, accumulator1, accumulator2];
      total.errors = accumulator3;

      total.uptimeToString = this.convertUptimeToString(accumulator6);

      this.rollup.push(total);
      this.rollup.sort((a: any, b: any) => {
        var nameA = a.minerName.toUpperCase(),
          nameB = b.minerName.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      })
      this.ref.markForCheck();
    }
  }

  convertUptimeToString(uptime) {
    if (uptime == null) return "";
    var seconds = uptime;
    var days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    var hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    var mins = Math.floor(seconds / 60);
    seconds -= mins * 60;

    return `${days > 0 ? days + ' days, ' : ''} ${hrs > 0 ? hrs + ' hrs, ' : ''} ${mins > 0 ? mins + ' mins, ' : ''} ${seconds > 0 ? seconds + ' sec' : ''}`;
  }
}
