import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  @Output() addEvent = new EventEmitter<string>();

  addPostForm: any;
  task: any;
  isTaskComplete: boolean = false;

  constructor(private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.gettingFormData();
  }

  //Getting Form data
  gettingFormData() {
    debugger
    this.addPostForm = this.FormBuilder.group({
      task: ['', [Validators.required]]
  });
}

  sendPostDataToParent() {
    if (this.addPostForm.valid) {
      this.addPostForm.value['completed'] = this.isTaskComplete;
      this.task = this.addPostForm.value;
      this.addEvent.next(this.task);
      this.formReset();
    }else {
      alert('Please Enter Your Task');
    }
  }

  formReset() {
    this.addPostForm.reset();
  }

}
