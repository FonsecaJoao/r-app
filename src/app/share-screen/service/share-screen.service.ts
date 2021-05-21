import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareScreenService {
  public shareScreen$: Subject<any> = new Subject<any>();


  constructor(private http: HttpClient) { }

  public shareScreen(destination_email: string, content_url: string) {
    return this.http.post(
      `https://private-anon-dcf1bacfd5-blissrecruitmentapi.apiary-mock.com/share?destination_email=${destination_email}&content_url=${content_url}`,
      {destination_email, content_url}
    ).subscribe(data => {      
      this.shareScreen$.next(data);
    });
  }
}