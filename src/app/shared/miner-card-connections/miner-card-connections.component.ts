import { Component, OnInit } from '@angular/core';
import { IXmrStakApiResponse, IXmrStakResults, IXmrStakConnection } from "../../../typings";

@Component({
    selector: 'miner-card-connections',
    templateUrl: './miner-card-connections.component.html'
})
export class MinerCardConnectionsComponent implements OnInit {
    public connections: IXmrStakConnection;
    constructor() {

    }
    ngOnInit() {

    }

    notify(data: IXmrStakApiResponse) {
        data.data.connection.uptimeToString = this.convertUptimeToString(data.data.connection.uptime);
        this.connections = data.data.connection;

    }

    convertUptimeToString(uptime){
        var seconds = uptime;// parseInt(uptime + "", 10);
        var days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        var hrs = Math.floor(seconds / 3600);
        seconds -= hrs * 3600;
        var mins = Math.floor(seconds / 60);
        seconds -= mins * 60;
    
        return `${days > 0 ? days + ' days, ' : ''} ${hrs > 0 ? hrs + ' hrs, ' : ''} ${mins > 0 ? mins + ' mins, ' : ''} ${seconds > 0 ? seconds + ' sec' : ''}`;
      }
}