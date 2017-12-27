import { Component, Input, ChangeDetectionStrategy, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile';
import { HttpClient } from '@angular/common/http';

import { IMiners } from '../../store/miners/miners.reducer';
import { IXmrStakApiResponse } from "../../../typings";
import { MinerCardHashrateComponent } from '../miner-card-hashrate/miner-card-hashrate.component';
import { MinerCardResultsComponent } from '../miner-card-results/miner-card-results.component';
import { MinerCardConnectionsComponent } from '../miner-card-connections/miner-card-connections.component';

@Component({
  selector: 'miner-card',
  templateUrl: './miner-card.component.html'
})
export class MinerCardComponent implements OnInit {
  @Input() miner: IMiners;
  @Output() minerUpdated: EventEmitter<any> = new EventEmitter<any>();
  public apiResult: IXmrStakApiResponse;
  public dataObservable: Observable<any>;

  @ViewChild("minerCardHashrrate")
  private hashRateCard: MinerCardHashrateComponent;

  @ViewChild("minerCardResults")
  private minerCardResults: MinerCardResultsComponent;

  @ViewChild("minerCardConnections")
  private minerCardConnections: MinerCardConnectionsComponent;
  
  private interval: number;
  private alive: boolean;

  constructor(private http: HttpClient) {
    this.interval = 10000;
    this.alive = true;
  }

  ngOnInit() {
    this.getData()
    .subscribe((data) => {
      this.apiResult = data;
    });

    this.dataObservable = this.getData();

    TimerObservable.create(0, this.interval)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.dataObservable
          .subscribe((data) => {
            this.apiResult = data;
            this.minerUpdated.emit(data);
            this.notify(this.hashRateCard, data);
            this.notify(this.minerCardResults, data);
            this.notify(this.minerCardConnections, data);
          },(error)=>{
            this.apiResult = error;
            this.minerUpdated.emit(error);
            this.notify(this.hashRateCard, error);
            this.notify(this.minerCardResults, error);
            this.notify(this.minerCardConnections, error);
          });
      });
  }

  notify(component, data){
      if(component && component.notify){
        component.notify(data);
      }
  }

  ngOnDestroy(){
    this.alive = false; // switches your TimerObservable off
  }

  getData(): Observable<any> {
    return this.http
      .get<IXmrStakApiResponse>(`/api/miners/getApiResult?name=${this.miner.name}`)
  }


}