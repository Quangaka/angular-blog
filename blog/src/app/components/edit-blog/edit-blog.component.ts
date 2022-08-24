import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/blog.model';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  public blogForm !: FormGroup;
  public blog !: Blog;
  public blogId: string = '';
  public file !: File;
  public imageSrc !: string;
  

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private route: ActivatedRoute) { 
    route.params.subscribe((params) => {
      this.blogId = params["id"];
    });
  
    this.http.get<any>(`http://localhost:5000/blog/${this.blogId}`)
    .subscribe(res => {
      this.blog = res;
      if(!this.blog) {
        alert("No blog found")
      } else {
        this.blogForm = this.formBuilder.group({
          title: [this.blog.title],
          topic: [this.blog.topic],
          description: [this.blog.description],
          imageSrc: [this.blog.imageSrc],
          body: [this.blog.body],
          published: [this.blog.status.toString()],
        })
        // this.blogForm.value.title = this.blog.title;
        // this.blogForm.value.topic = this.blog.topic;
        // this.blogForm.value.description = this.blog.description;
        // this.blogForm.value.imageSrc = this.blog.imageSrc;
        // this.blogForm.value.body = this.blog.body;
      }
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    
  }

  patch() {
    const body = {
      title: this.blogForm.value.title,
      topic: this.blogForm.value.topic,
      description: this.blogForm.value.description,
      imageSrc: this.imageSrc,
      body: this.blogForm.value.body,
      status: this.blogForm.value.published,
    }

    console.log(body.status)
    this.http.patch(`http://localhost:5000/blog/${this.blogId}`, body)
    .subscribe(res => {
      alert("Edit blog Successfully")
      this.router.navigate(['blog']);
    }, err => {
      console.log(err);
      alert(err)
    })
  }

  async  processFile(imageInput: any) {
    this.file = imageInput.files[0];
    // console.log(this.file)
    // reader.readAsDataURL(this.file);
    // console.log(reader)
    // console.log(reader.result)
    const temp = await this.toBase64(this.file);

    if(temp) {
      this.imageSrc = temp as string;
    }
  }

  toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

}
