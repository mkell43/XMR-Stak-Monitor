import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IXmrStakApiResponse, IXmrStakResults } from "../../../typings";
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile';

@Component({
    selector: 'miner-card-results',
    templateUrl: './miner-card-results.component.html'
})
export class MinerCardResultsComponent implements OnInit {
    @Input() dataObservable: Observable<any>;
    public results:IXmrStakResults;
    constructor() {

    }
    ngOnInit() {
        this.dataObservable.subscribe((data) => {
            this.results = data.results;
        });
    }
}