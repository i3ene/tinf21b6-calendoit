import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  events:{name:string;date:Date} [] = [];

  constructor() { }

  ngOnInit(): void {

  }

  addEvent(name:string,date:string): void{
    this.events.push({name:name,date:new Date(date)});
    console.log(this.events);
  }

}
