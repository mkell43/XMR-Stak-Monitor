import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MINERS_GET_ALL } from '../../store/miners/miners.actions';
import { IAppState } from '../../store';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {

  @ViewChild('topnav') topnav: ElementRef;
  miners$:Observable<any>;
  constructor(public store: Store<IAppState>) { 
    this.miners$ = store.select('miners');

  }

  ngOnInit() {}

  toggle() {
    this.topnav.nativeElement.classList.toggle(['responsive']);
  }

}
