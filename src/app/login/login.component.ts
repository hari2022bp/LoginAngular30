import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errMsg: string="";

  constructor(private fb: FormBuilder, private userService: UserService,) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.errMsg = "";
    if (this.loginForm.valid) {
      const user = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      console.log("user:",user);

      this.userService.loginUser(user).subscribe(
        res => {
          console.log(res);
          alert("Login successful");
          console.log('Login successful');
        },
        error => {
          // Handle the error case
          this.errMsg = "User already exist.";
          console.error('User already exist.', error);
          alert("User already exist");
        }
      );
      
    } else {
      this.errMsg = "Form is invalid. Please check the input values.";
      alert("Login failed");
    }
  }
}
