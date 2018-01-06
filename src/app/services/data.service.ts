import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@Injectable()

//api calls listed here to get json. eventually would include post, put, delete as well
export class DataService {
  constructor(
    private http:Http
  ) {}

  private recordsUrl = '/assets/records.json';
  public records: any;

  getRecords() {
      return this.http.get(this.recordsUrl)
          .map((res: Response) => {
              this.records = res.json();
              return this.records;
          })
          .catch((error: Response) => Observable.throw(error.json()));
  }

}
