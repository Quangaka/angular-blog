import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogRowComponent } from './components/blog-row/blog-row.component';
import { BlogComponent } from './components/blog/blog.component';
import { AccountComponent } from './components/account/account.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    BlogListComponent,
    BlogRowComponent,
    BlogComponent,
    AccountComponent,
    CreateBlogComponent,
    EditBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
