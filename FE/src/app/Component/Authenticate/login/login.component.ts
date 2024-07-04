import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginData = { username: this.username, password: this.password };

    this.http.post('http://localhost:5005/api/Authenticate/login', loginData)
      .subscribe(response => {
        console.log('Login successful:', response);
        localStorage.setItem('token',JSON.stringify(response));
        // Redirect to home or another page after successful login
        this.router.navigate(['/admin']);
      }, error => {
        console.error('Login failed:', error);
      });
  }
}
