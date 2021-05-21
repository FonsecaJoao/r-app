import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { QuestionsDetailsComponent } from './questions/questions-details/questions-details.component';
import { QuestionsListComponent } from './questions/questions-list/questions-list.component';

const routes: Routes = [
  { path: '', component: LoadingScreenComponent },
  { path: 'questions', component: QuestionsListComponent },
  { path: 'questions/:questionId', component: QuestionsDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
