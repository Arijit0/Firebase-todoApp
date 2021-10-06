import { Component, OnInit } from '@angular/core';
import { ArrayDataService } from '../services/array-data.service';

@Component({
  selector: 'app-array-methods',
  templateUrl: './array-methods.component.html',
  styleUrls: ['./array-methods.component.scss']
})
export class ArrayMethodsComponent implements OnInit {

  constructor(private arrService: ArrayDataService) { }

  dataArray: any = [];

  ngOnInit(): void {
    this.getArrays();
  }

  getArrays() {
    this.dataArray = this.arrService.arrayOfData();
  }
}
