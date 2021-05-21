import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShareScreenService } from './service/share-screen.service';

@Component({
  selector: 'app-share-screen',
  templateUrl: './share-screen.component.html',
  styleUrls: ['./share-screen.component.scss']
})
export class ShareScreenComponent implements OnInit {
  readonly subscriptions: Subscription[] = [];

  public isLoading: boolean = false;
  public userWantsToShare: boolean = true;
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });


  constructor(private shareScreenService: ShareScreenService) { }

  ngOnInit(): void {
    this.subscribeRequests()
  }

  subscribeRequests() {
    this.subscriptions.push(this.shareScreenService.shareScreen$.subscribe(data => {
      this.userWantsToShare = true;
      this.isLoading = false;
      this.form.reset();

      if (data.status === 'OK') {
        console.log('Screen shared sucessfully');

      } else {
        throw new Error('Something wrong happened. Try again.')
      }
    }));
  }

  shareScreen() {
    this.isLoading = true;
    this.shareScreenService.shareScreen(this.form.value.email, location.href);
  }

  changeButton(): void {
    this.userWantsToShare = false;
  }


}
