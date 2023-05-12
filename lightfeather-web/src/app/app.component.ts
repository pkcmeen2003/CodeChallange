import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { RestServiceService } from './rest-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'lightfeather-web';
  form: FormGroup;
  supervisors = [];
  errorMsg = '';

  constructor(private http: HttpClient,private restService: RestServiceService) {
    this.form = new FormGroup({
      name: new FormControl(''),
      lname: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      supervisor: new FormControl('')
    });
  }

  ngOnInit() {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('username:password') });
    this.http.get('http://localhost:8080/api/supervisors', { headers }).subscribe(
      data => this.supervisors = data as any,
      err => this.errorMsg = err.message
    );
    
  }

  onSubmit() {
    this.restService.postData(this.form.value).subscribe(
      res => console.log('HTTP response', res),
      err => {
        console.log('HTTP Error', err);
        this.errorMsg = err;
      },
      () => console.log('HTTP request completed.')
    );
  
 


    /*const headers = new HttpHeaders({});
    this.http.post('http://localhost:8080/api/submit', this.form.value, { headers }).subscribe(
      err => {
        this.errorMsg = Object.values(err.error) as any
      }
    );
    console.log(this.errorMsg);*/
  }
}
