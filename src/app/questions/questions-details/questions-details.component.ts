import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuestionsList, QuestionsService } from '../service/questions.service';

@Component({
  selector: 'app-questions-details',
  templateUrl: './questions-details.component.html',
  styleUrls: ['./questions-details.component.scss']
})
export class QuestionsDetailsComponent implements OnInit {
  readonly subscriptions: Subscription[] = [];
  public questionId!: number;
  public question!: QuestionsList;

  public isLoading: boolean = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(param => {
      this.questionId = param.questionId;

      this.subscribeRequests();
      this.questionsService.getQuestion(this.questionId);
    }));
  }

  subscribeRequests() {
    this.subscriptions.push(this.questionsService.questionItem$.subscribe(data => {
      this.question = {};
      this.dataArrived();
    }));
  }

  dataArrived() {
    if (this.question) {
      this.isLoading = false;
    }
  }

  goBack() {
    this.router.navigate(['/questions']);
  }

}
