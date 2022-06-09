import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.widgets = [];
    this.widgets.push({title: 'test', actions: null, content: null});
    this.widgets.push({title: 'test2', actions: null, content: null});
  }

  widgets!: { title: string, content: any, actions: any }[];

}
