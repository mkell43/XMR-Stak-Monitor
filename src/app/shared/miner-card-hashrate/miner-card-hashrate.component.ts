import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IXmrStakApiResponse, IXmrStakHashRate } from "../../../typings";
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile';

@Component({
    selector: 'miner-card-hashrate',
    templateUrl: './miner-card-hashrate.component.html'
})
export class MinerCardHashrateComponent implements OnInit {
    @Input() dataObservable: Observable<any>;
    public hashrate:IXmrStakHashRate;
    constructor() {

    }
    ngOnInit() {
        this.dataObservable.subscribe((data) => {
            this.hashrate = data.data.hashrate;
        });
    }
}