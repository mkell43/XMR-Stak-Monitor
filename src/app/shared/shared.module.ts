import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { RouterModule } from '@angular/router';
import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import {MinerCardComponent} from "./miner-card/miner-card.component"
import {MinerCardHashrateComponent} from "./miner-card-hashrate/miner-card-hashrate.component"
import {MinerCardResultsComponent} from "./miner-card-results/miner-card-results.component"
import { MinerCardConnectionsComponent } from './miner-card-connections/miner-card-connections.component';
@NgModule({
  declarations: [
    TopNavigationComponent,
    SubNavigationComponent,
    LoaderComponent,
    MinerCardComponent,
    MinerCardHashrateComponent,
    MinerCardResultsComponent,
    MinerCardConnectionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TopNavigationComponent,
    LoaderComponent,
    SubNavigationComponent,
    MinerCardComponent,
    MinerCardHashrateComponent,
    MinerCardResultsComponent,
    MinerCardConnectionsComponent
  ]
})
export class SharedModule {}
