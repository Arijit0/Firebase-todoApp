import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-footer-actions',
  templateUrl: './footer-actions.component.html',
  styleUrls: ['./footer-actions.component.scss']
})
export class FooterActionsComponent implements OnInit {

  @Input()taskList!: Subject<boolean>;
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() sortingTaskEvent = new EventEmitter<string>();
  
  remainingTask: number = 0;
  completedTasks: any;
  selected: string = 'all';
  

  constructor() { }

  ngOnInit(): void {
    this.gettingDBdata();
  }

  gettingDBdata() {
    this.taskList.subscribe((res: any=[]) => {
      this.completedTasks = res;
      this.remainingTask = 0;
      res.forEach((element: any) => {
        if(!element.completed) {
          this.remainingTask++;
        }
      });
      // this.remainingTask = res.map((item: any) => 
      //   item.completed
      // ) 
      console.log(this.remainingTask);
      
    })
  }

  DeleteCompletedTask() {
    this.deleteEvent.emit(this.completedTasks);
  }

  sortingTodoList(btnValue: any) {
    this.selected = btnValue;
    this.sortingTaskEvent.emit(btnValue);
  }
}
