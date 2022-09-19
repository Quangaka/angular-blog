import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  public blogForm !: FormGroup;

  public file !: File;
  public imageSrc !: string;

  public idAccountLocal: string | null ='';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public userService: UserService) { 
    this.blogForm = this.formBuilder.group({
      title: [''],
      topic: [''],
      description: [''],
      imageSrc: [''],
      published: [''],
    })

    this.idAccountLocal = localStorage.getItem('id')
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
      body: this.ckeModel.data,
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

  public onChange( event: CKEditor4.EventInfo ) {
    this.ckeModel.data = event.editor.getData()
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
}