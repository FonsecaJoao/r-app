import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuestionsList, QuestionsService } from '../service/questions.service';
import * as moment from 'moment';

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
  public form!: FormGroup;

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
      this.question = data;
      this.dataArrived();
    }));

    this.subscriptions.push(this.questionsService.questionItemUpdate$.subscribe(data => {
      this.question = data;
      this.dataArrived();
    }));
  }

  dataArrived() {
    if (this.question) {
      this.isLoading = false;
      this.initForm();
    }
  }

  initForm() {
    this.form = new FormGroup({
      id: new FormControl(this.question.id),
      image_url: new FormControl(this.question.image_url),
      question: new FormControl(this.question.question),
      thumb_url: new FormControl(this.question.thumb_url),
      choices: new FormControl(this.question.choices),
      published_at: new FormControl(moment(this.question.published_at).format('MMMM Do YYYY, h:mm:ss a')),
      choice_selected: new FormControl()
    });
  }

  vote() {
    this.isLoading = true;

    this.questionsService.updateQuestion(this.question);
  }

  goBack() {
    this.router.navigate(['/questions']);
  }

}
