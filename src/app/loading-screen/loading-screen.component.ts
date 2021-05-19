import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingScreenService } from './service/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})

export class LoadingScreenComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];
  public statusOkay: boolean = false;
  public isLoading: boolean = true;

  constructor(private loadingService: LoadingScreenService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscribeRequests();
    this.checkServerHealth();
  }

  subscribeRequests() {
    this.subscriptions.push(this.loadingService.serverStatus$.subscribe(data => {
      this.isLoading = false;
      if (data.status === 'OK') {
        this.statusOkay = true;
        this.router.navigate(['/questions'])
      } else {
        this.statusOkay = false;
      }
    }));
  }

  checkServerHealth() {
    this.isLoading = true;
    this.loadingService.checkServerHealth();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
