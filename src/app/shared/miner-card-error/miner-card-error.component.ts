import { Component, Input, ChangeDetectionStrategy, OnInit, EventEmitter } from '@angular/core';
import { IXmrStakApiResponse, IXmrStakError } from "../../../typings";

@Component({
    selector: 'miner-card-error',
    templateUrl: './miner-card-error.component.html'
})
export class MinerCardErrorComponent implements OnInit {
    @Input()
    public errors:IXmrStakError[];

    constructor() {

    }
    ngOnInit() {

    }
}