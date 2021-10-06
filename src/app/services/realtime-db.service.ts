import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RealtimeDBService {

  angularFireOBJ: AngularFireObject<any> | any;
  angularFireListRef: AngularFireList<any> | any;
 

  constructor(private db: AngularFireDatabase) { 
      this.angularFireListRef = this.db.list('/todoList');
  }

getAllData() {
  return this.angularFireListRef;
} 

add(data: any) {
  this.angularFireListRef.push(data);
}

deleteAll() {
 this.angularFireListRef.remove();
}

delete(key: any) {
  this.angularFireListRef.remove(key);
}

update(key: string, value: any): Observable<void> {
  return this.angularFireListRef.update(key, value);
}

}
