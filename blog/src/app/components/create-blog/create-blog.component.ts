import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  public blogForm !: FormGroup;
  public file !: File;
  public imageSrc !: string;
  

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { 
    this.blogForm = this.formBuilder.group({
      title: [''],
      topic: [''],
      description: [''],
      image: [''],
      body: [''],
      published: [''],
    })
  }

  ngOnInit(): void {
  }

  post() {
    const authorId = localStorage.getItem('id');
    const body = {
      author: authorId,
      title: this.blogForm.value.title,
      topic: this.blogForm.value.topic,
      description: this.blogForm.value.description,
      imageSrc: this.imageSrc,
      body: this.blogForm.value.body,
      status: this.blogForm.value.published
    }

    console.log(body.status)


    this.http.post<any>("http://localhost:5000/blog", body)
    .subscribe(res => {
      const blog = res;
      if (blog) {
        alert("Create Blog Successfully");
        this.blogForm.reset();
        this.router.navigate(['blog'])
      } else {
        alert("Create Blog Failed")
      }
    }, err => {
      alert("Something went wrong")
      console.log(err);
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
