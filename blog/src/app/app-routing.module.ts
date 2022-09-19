import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BlogComponent } from './components/blog/blog.component';
import { AccountComponent } from './components/account/account.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { TopicITComponent } from './components/topic-it/topic-it.component';
import { TopicLifeComponent } from './components/topic-life/topic-life.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'blog',
    component: HomeComponent,
  },
  {
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: 'sign-up', 
    component: SignUpComponent,
  }, 
  {
    path: 'blog/:id',
    component: BlogComponent,
  },
  {
    path: 'account/:id',
    component: AccountComponent,
  },
  {
    path: 'create-blog',
    component: CreateBlogComponent,
  },
  {
    path: 'edit-blog/:id',
    component: EditBlogComponent,
  },
  {
    path: 'topic-it',
    component: TopicITComponent
  },
  {
    path: 'topic-life',
    component: TopicLifeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
