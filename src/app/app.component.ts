import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RealtimeDBService } from './services/realtime-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todoApplication';

  taskList: any = [];
  key: any;
  element: any;
  allTask: any;
  isdarkMode: boolean = true;


  //Sending Data to Child footer
  taskListData: Subject<boolean> = new Subject();
  //Sending Data to Child footer

  rootData: any = [];

constructor(private firebaseDB: RealtimeDBService) {}


//Add data to Database
  addTodo(task: any) {
    this.firebaseDB.add(task);
  }

  //Fetch data from Database
  getDataFromDb() {
      this.firebaseDB.getAllData().snapshotChanges().pipe(
        map((changes: any[]) =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe((data: any) => {

        
          this.taskList = data; // Actual main Array list of data
          this.rootData = data; // Temp variable for sorting All task, Completed task and Incompleted task
  
          //Sending Data to Child footer
          this.taskListData.next(this.taskList);
          //Sending Data to Child footer
        

       

      }, (error: any) => {
        console.log(error);
      });
  }

  //Delete data from Database
  deleteTask(key: any) {
    console.log(key);
    this.firebaseDB.delete(key);
  }

  //Update completed task data on Database
  updateStatus(element: any) {
    this.firebaseDB.update(element.key,element);
  }

  //Delete data from Database
  deleteCompTask(event: any) {
   event.forEach((element: any) => {
      if(element.completed == true) {
        this.firebaseDB.delete(element.key)
      }
   });
  }


//Sorting data for All task, Completed task and Incompleted task
  filteringTodoList(event: any) {
    if(event == 'all') {
      this.taskList = this.rootData;
    } else if(event == 'active') {
      this.taskList = [];
      this.rootData.forEach((item: any) => {
       if(!item.completed) {
         this.taskList.push(item);
       }
     }); 
    } else if(event == 'completed') {
      this.taskList = [];
       this.rootData.forEach((item: any) => {
        if(item.completed) {
          this.taskList.push(item);
        }
      }); 
    } else {
    }
  }

  changeToLightMode() {
    this.isdarkMode = false;
  }

  changeToDarkMode() {
    this.isdarkMode = true;
  }
}
