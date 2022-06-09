import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() title!: string;
  @Input() content: any;
  @Input() actions: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
