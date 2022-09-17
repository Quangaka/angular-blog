import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditor4 } from 'ckeditor4-angular';
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

  public ckeModel = {
    ckeConfig: {
      extraPlugins: 'uploadimage',
      uploadUrl:      'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

      // Configure your file manager integration. This example uses CKFinder 3 for PHP.
      filebrowserBrowseUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
      filebrowserImageBrowseUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      filebrowserUploadUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      filebrowserImageUploadUrl:'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images'
    },
    data: '<p>Insert body here</p>'
  }
  

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
          published: [this.blog.status.toString()],
        })
        this.ckeModel.data = this.blog.body;
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
      body: this.ckeModel.data,
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

  public onChange( event: CKEditor4.EventInfo ) {
    this.ckeModel.data = event.editor.getData()
  }
}
