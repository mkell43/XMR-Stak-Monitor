import { Component, OnInit } from '@angular/core';
import { IXmrStakApiResponse, IXmrStakResults, IXmrStakConnection } from "../../../typings";

@Component({
    selector: 'miner-card-connections',
    templateUrl: './miner-card-connections.component.html'
})
export class MinerCardConnectionsComponent implements OnInit {
    public connections:IXmrStakConnection;
    constructor() {

    }
    ngOnInit() {

    }

    notify(data:IXmrStakApiResponse){
        this.connections = data.data.connection;
    }
}