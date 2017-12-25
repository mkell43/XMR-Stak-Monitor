import { Component, Input, ChangeDetectionStrategy, OnInit, EventEmitter } from '@angular/core';
import { IXmrStakApiResponse, IXmrStakHashRate } from "../../../typings";
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile';

@Component({
    selector: 'miner-card-hashrate',
    templateUrl: './miner-card-hashrate.component.html'
})
export class MinerCardHashrateComponent implements OnInit {
    public hashrate:IXmrStakHashRate;

    @Input()
    public minerUpdated: EventEmitter<any>;
    constructor() {

    }
    ngOnInit() {

    }

    notify(data:IXmrStakApiResponse){
        this.hashrate = data.data.hashrate;
    }
    
}