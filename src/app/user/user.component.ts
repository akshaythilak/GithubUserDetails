// user.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  username: any = '';
  user: any;
  repos: any[] = [];
  displayedRepos: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {}

  ngOnInit(): void {
    // Retrieve username from the route parameters
    this.username = this.route?.snapshot?.paramMap?.get('username');

    // Fetch user details
    this.githubService.getUser(this.username).subscribe((user) => {
      this.user = user;
    });

    // Fetch user repositories
    this.githubService.getRepos(this.username).subscribe((repos) => {
      this.repos = repos;
      this.updateDisplayedRepos();
    });
  }

  updateDisplayedRepos() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedRepos = this.repos.slice(startIndex, startIndex + this.pageSize);
    this.totalPages = Math.ceil(this.repos.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedRepos();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedRepos();
    }
  }
}
