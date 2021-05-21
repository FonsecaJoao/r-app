import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface QuestionsList {
  choices: { choice: string, votes: number }[];
  id: number;
  image_url: string;
  published_at: string;
  question: string;
  thumb_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  public questionsList$: Subject<QuestionsList[]> = new Subject<QuestionsList[]>();
  public questionItem$: Subject<QuestionsList[]> = new Subject<QuestionsList[]>();


  constructor(private http: HttpClient) { }

  public getQuestions(limit: number, offset: number, filter: string) {
    return this.http.get<QuestionsList[]>(
      `https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?limit=${limit}&offset=${offset}&filter=${filter}`
    ).subscribe(data => {

      this.questionsList$.next(data);
    });
  }

  public getQuestion(questionId: number) {
    return this.http.get<QuestionsList[]>(
      `https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?${questionId}`
    ).subscribe(data => {

      this.questionItem$.next(data);
    });
  }
}
