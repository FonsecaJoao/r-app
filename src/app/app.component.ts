import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];
  public statusOkay: boolean = false;

  constructor(private httpClient: HttpClient) { }

  checkServerHealth() {
    this.subscriptions.push(this.httpClient.get<any>('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/health').subscribe(data => {
      this.statusOkay = data.status !== 'OK' ? true : false;
    }));

  }

  ngOnInit(): void {
    this.checkServerHealth();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
