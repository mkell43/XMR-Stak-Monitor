import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MINERS_GET_ALL } from '../store/miners/miners.actions';
import { IAppState } from '../store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  form: FormGroup;

  miners$: Observable<{}>;

  constructor(public fb: FormBuilder, public store: Store<IAppState>) {

    this.miners$ = store.select('miners');


  }
}
