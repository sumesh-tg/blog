import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml } from '@angular/platform-browser';
import { PostPagenationService } from 'src/app/services/post-pagenation.service';
import { TimeagoIntl } from 'ngx-timeago';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  postsArray: Post[];
  config: any;
  html: SafeHtml;
  //Save first document in snapshot of items received
  firstInResponse: any = [];

  //Save last document in snapshot of items received
  lastInResponse: any = [];

  //Keep the array of first document of previous pages
  prev_strt_at: any = [];

  //Maintain the count of clicks on Next Prev button
  pagination_clicked_count = 0;

  //Disable next and prev buttons
  disable_next: boolean = false;
  disable_prev: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer
    , private postPagenationService: PostPagenationService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 2,
      totalItems: 100
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.firstInResponse = posts[0].payload.doc;
      this.lastInResponse = posts[posts.length - 1].payload.doc;
      this.prev_strt_at = [];
      this.pagination_clicked_count = 0;
      this.disable_next = false;
      this.disable_prev = false;
      this.push_prev_startAt(this.firstInResponse);
      this.postsArray = posts.map(e => {
        const data = e.payload.doc.data();
        let id = e.payload.doc.id;
        return { id, ...(data as Object) } as Post;
      });
      console.log("Firedata ::: ", this.postsArray);
    });
  }
  prevPage() {
    this.postService.prevPage(this.firstInResponse, this.get_prev_startAt()).subscribe(posts => {
      this.firstInResponse = posts[0].payload.doc;
      this.lastInResponse = posts[posts.length - 1].payload.doc;
      this.pagination_clicked_count--;
      this.pop_prev_startAt(this.firstInResponse);
      this.disable_prev = false;
      this.disable_next = false;
      this.postsArray = posts.map(e => {
        const data = e.payload.doc.data();
        let id = e.payload.doc.id;
        return { id, ...(data as Object) } as Post;
      });
    });
  }
  nextPage() {
    this.postService.nextPage(this.lastInResponse).subscribe(posts => {
      this.firstInResponse = posts[0].payload.doc;
      this.lastInResponse = posts[posts.length - 1].payload.doc;
      this.pagination_clicked_count++;
      this.push_prev_startAt(this.firstInResponse);
      this.disable_next = false;
      this.postsArray = posts.map(e => {
        const data = e.payload.doc.data();
        let id = e.payload.doc.id;
        return { id, ...(data as Object) } as Post;
      });
      console.log("next page ::: ", this.postsArray);
    });
  }
  pageChange(newPage: number) {
    this.router.navigate(['/dashboard/blog'], { queryParams: { page: newPage } });
  }
  sanitizeTxt(txt): SafeHtml {
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.transform(txt));
    return this.html;
  }
  transform(htmlContent: any): any {
    const oembed = htmlContent.split('</oembed>');
    let body = '';
    oembed.forEach((item, index) => {
      body += oembed[index] + '</oembed>';
      const oembed1 = item.split('url="')[1];
      if (oembed1) {
        const oembed2 = oembed1.split('">')[0];
        if (oembed2) {
          const youtube = oembed2.split('https://www.youtube.com/watch?v=')[1];
          if (youtube) {
            body += '<div class="embed-responsive embed-responsive-16by9"><iframe src="https://youtube.com/embed/' + youtube + '" frameborder="0"; scrolling="no"; allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
          }
        }
      }
    });
    return body;
  }
  redirectToReadmore(postModel) {
    this.router.navigate(['/dashboard/blog-post'], { queryParams: { postId: postModel.id } });
  }
  //Add document
  push_prev_startAt(prev_first_doc) {
    this.prev_strt_at.push(prev_first_doc);
  }
  //Remove not required document 
  pop_prev_startAt(prev_first_doc) {
    this.prev_strt_at.forEach(element => {
      if (prev_first_doc.data().id == element.data().id) {
        element = null;
      }
    });
  }

  //Return the Doc rem where previous page will startAt
  get_prev_startAt() {
    if (this.prev_strt_at.length > (this.pagination_clicked_count + 1))
      this.prev_strt_at.splice(this.prev_strt_at.length - 2, this.prev_strt_at.length - 1);
    return this.prev_strt_at[this.pagination_clicked_count - 1];
  }
}
