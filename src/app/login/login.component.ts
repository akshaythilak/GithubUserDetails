import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private githubService: GithubService) {}

  search(form: NgForm) {
    if (form.valid) {
      const searchQuery = form.value.searchQuery;
      // Perform search logic, navigate to user page, etc.
      this.router.navigate(['/user', searchQuery]);
    }
  }
}
