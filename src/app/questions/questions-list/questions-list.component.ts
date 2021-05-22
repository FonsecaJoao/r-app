import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuestionsList, QuestionsService } from '../service/questions.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit, AfterViewInit {
  readonly subscriptions: Subscription[] = [];
  public displayedColumns: string[] = ['id', 'question', 'image_url', 'thumb_url', 'published_at'];
  public dataSource: MatTableDataSource<QuestionsList> = new MatTableDataSource<QuestionsList>();
  public questionsList!: QuestionsList[];
  public isLoading: boolean = true;
  public inputValue: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('input') inputField!: ElementRef;


  constructor(private questionsService: QuestionsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.subscribeRequests();
  }

  ngAfterViewInit() {
    this.inputField.nativeElement.focus();

    const splitedUrl: string[] = this.router.routerState.snapshot.url.split('?');

    if (splitedUrl.length > 1) {
      const extractFilterValue = splitedUrl[1].split('=');
      this.inputValue = extractFilterValue[1];
    }

    this.questionsService.getQuestions(10, 0, this.inputValue)

  }

  subscribeRequests() {
    this.subscriptions.push(this.questionsService.questionsList$.subscribe(data => {
      this.questionsList = data;
      this.dataSource.data = this.questionsList;
      this.dataArrived();
    }));
  }

  dataArrived(): void {
    if (this.questionsList) {
      this.isLoading = false;
    }
  }

  search() {
    this.isLoading = true;
    this.changeQueryParamsInBrowserURL();
    this.questionsService.getQuestions(10, 0, this.inputValue.trim().toLowerCase());
  }

  changePage(event: any) {
    console.log('TODO: on page change request questionsList', event);
  }

  changeQueryParamsInBrowserURL(){
    this.router.navigate([], {
     relativeTo: this.route,
     queryParams: {
       filter: this.inputValue.trim().toLowerCase()
     },
     queryParamsHandling: 'merge',
     skipLocationChange: false
   });
  }

  goToDetails(elem: QuestionsList) {
    this.router.navigate(['/questions/' + elem.id]);
  }
}
