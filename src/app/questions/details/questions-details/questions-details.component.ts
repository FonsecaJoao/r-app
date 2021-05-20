import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questions-details',
  templateUrl: './questions-details.component.html',
  styleUrls: ['./questions-details.component.scss']
})
export class QuestionsDetailsComponent implements OnInit {
  readonly subscriptions: Subscription[] = [];
  public questionId: number | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(param => {
      this.questionId = param.questionId;
    }));

    console.log('TODO question ID ', this.questionId);
    
  }

}
