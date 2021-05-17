import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface ServerStatus {
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  public serverStatus$: Subject<ServerStatus> = new Subject<ServerStatus>()

  constructor(private http: HttpClient) { }

  public checkServerHealth() {
    return this.http.get<ServerStatus>('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/health').subscribe(data => {
      this.serverStatus$.next(data);
    });
  }
}
