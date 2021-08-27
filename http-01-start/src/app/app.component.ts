import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  error: string;
  errorSub: Subscription;
  private isFetching: boolean;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.errorSub = this.postsService.error
      .subscribe(errorMessage => {
        this.error = errorMessage
      });

    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postsService.clearPosts()
      .subscribe(_ => {
        this.fetchPosts();
      })
  }

  onHandleError() {
    this.error = null;
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      });
  }
}