import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    email = '';
    password = '';
    errorMessage = '';
    error: { name: string, message: string } = { name: '', message: '' };
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  changePageLogin() {
    this.router.navigate(['login']);
  }

    clearErrorMessage() {
        this.errorMessage = '';
        this.error = { name: '', message: '' };
    }

    onSignUp(): void {
        this.clearErrorMessage();

        if (this.validateForm(this.email, this.password)) {
            this.authService.signUpWithEmail(this.email, this.password)
                .then(() => {
                    this.router.navigate(['/user'])
                }).catch(_error => {
                this.error = _error;
            });
        }
    }

    validateForm(email: string, password: string): boolean {
        if (email.length === 0) {
            this.errorMessage = 'Please enter Email!'
            return false
        }

        if (password.length === 0) {
            this.errorMessage = 'Please enter Password!'
            return false
        }

        if (password.length < 6) {
            this.errorMessage = 'Password should be at least 6 characters!'
            return false
        }

        this.errorMessage = ''

        return true
    }

}
