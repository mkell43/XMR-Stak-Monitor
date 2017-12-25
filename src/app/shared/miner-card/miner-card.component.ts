import { Component, Input, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile';
import { HttpClient } from '@angular/common/http';

import { IMiners } from '../../store/miners/miners.reducer';
import { IXmrStakApiResponse } from "../../../typings";

@Component({
  selector: 'miner-card',
  templateUrl: './miner-card.component.html'
})
export class MinerCardComponent implements OnInit {
  @Input() miner: IMiners;
  @Output() minerUpdated: EventEmitter<any> = new EventEmitter<any>();
  public apiResult: IXmrStakApiResponse;
  public dataObservable: Observable<any>;

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
          },(error)=>{
            this.apiResult = error;
            this.minerUpdated.emit(error);
          });
      });
  }

  ngOnDestroy(){
    this.alive = false; // switches your TimerObservable off
  }

  getData(): Observable<any> {
    return this.http
      .get<IXmrStakApiResponse>(`/api/miners/getApiResult?name=${this.miner.name}`)
  }


}