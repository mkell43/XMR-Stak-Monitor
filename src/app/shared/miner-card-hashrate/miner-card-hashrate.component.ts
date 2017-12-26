import { Component, Input, ChangeDetectionStrategy, OnInit, EventEmitter } from '@angular/core';
import { IXmrStakApiResponse, IXmrStakHashRate } from "../../../typings";

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