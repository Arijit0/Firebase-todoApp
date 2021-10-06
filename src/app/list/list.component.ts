import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Output() fetchEvent = new EventEmitter<string>();
  @Output() delEvent = new EventEmitter<string>();
  @Output() updateEvent = new EventEmitter<string>();
  @Input() list: any = [];
  // @Input() i: any = [];


  taskList: any = [];
  index: any;
  key: any;
  indexOfList: any;

  constructor() { }

  ngOnInit(): void {
    this.gettingDBdata();
  }

  gettingDBdata() {
    this.fetchEvent.emit();
  }

  sendDeleteTaskToParent(eachTask: any) {
    this.key = eachTask.key;
    this.delEvent.emit(this.key);
  }

  updateTaskStatus(i: any,listData: any) {
    let key = listData.key;
    this.list.forEach((element: any) => {
      if(key == element.key) {
        // console.log(element);
        element.completed = true;
        this.updateEvent.emit(element);
        this.index = i;
      }
    });
  }

  // mouseHoverIn(i: any) {
  //   this.index = i;
  // }

  // mouseHoverOut() {
  //   this.index = undefined;
  // }

}
