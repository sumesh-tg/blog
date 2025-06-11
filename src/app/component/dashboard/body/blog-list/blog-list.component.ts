import { Component, OnInit, Inject } from '@angular/core';
import { PostService } from 'app/services/post.service';
import { Post } from 'app/models/post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PostPagenationService } from 'app/services/post-pagenation.service';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common'; // <-- Add this line
import { TimeagoModule, TimeagoDefaultClock,TimeagoFormatter, TimeagoCustomFormatter, TimeagoIntl, TimeagoClock } from 'ngx-timeago';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  imports: [CommonModule, TimeagoModule, NgxPaginationModule],
  standalone: true,
  providers: [
    TimeagoIntl,
    { provide: TimeagoClock, useClass: TimeagoDefaultClock }, // <-- Fix here
    { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter }
  ]
})
export class BlogListComponent implements OnInit {
  postsArray: Post[] = [];
  config: any;
  html: SafeHtml = '';
  //Save first document in snapshot of items received
  firstInResponse: any = null;
  lastInResponse: any = null;
  prev_strt_at: any[] = [];
  pagination_clicked_count = 0;
  disable_next: boolean = false;
  disable_prev: boolean = false;

  constructor(
    private postService: PostService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private postPagenationService: PostPagenationService
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 2,
      totalItems: 100
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);
  }

  ngOnInit(): void {
     this.loadPosts();
  }
  loadPosts() {
    this.postService.getPosts().subscribe((posts: any[]) => {
      this.postsArray = posts.map((doc: any) => {
        // If doc is a Firestore DocumentSnapshot, extract data and id
        if (doc.payload && doc.payload.doc) {
          const data = doc.payload.doc.data();
          const id = doc.payload.doc.id;
          return { id, ...data } as Post;
        }
        // If doc is already an object with id and data
        if (doc.id && doc.createdDate) {
          return doc as Post;
        }
        // Fallback: just return as is
        return doc;
      });
      // If you want to implement pagination with snapshots, adjust your service to return snapshots
      // For now, just reset pagination
      this.prev_strt_at = [];
      this.pagination_clicked_count = 0;
      this.disable_next = false;
      this.disable_prev = false;
    });
  }

  prevPage() {
    // this.postService.prevPage(this.firstInResponse, this.get_prev_startAt()).subscribe(posts => {
    //   this.firstInResponse = posts[0].payload.doc;
    //   this.lastInResponse = posts[posts.length - 1].payload.doc;
    //   this.pagination_clicked_count--;
    //   this.pop_prev_startAt(this.firstInResponse);
    //   this.disable_prev = false;
    //   this.disable_next = false;
    //   this.postsArray = posts.map(e => {
    //     const data = e.payload.doc.data();
    //     let id = e.payload.doc.id;
    //     return { id, ...(data as Object) } as Post;
    //   });
    // });
  }
  nextPage() {
    // this.postService.nextPage(this.lastInResponse).subscribe(posts => {
    //   this.firstInResponse = posts[0].payload.doc;
    //   this.lastInResponse = posts[posts.length - 1].payload.doc;
    //   this.pagination_clicked_count++;
    //   this.push_prev_startAt(this.firstInResponse);
    //   this.disable_next = false;
    //   this.postsArray = posts.map(e => {
    //     const data = e.payload.doc.data();
    //     let id = e.payload.doc.id;
    //     return { id, ...(data as Object) } as Post;
    //   });
    //   console.log("next page ::: ", this.postsArray);
    // });
  }
  pageChange(newPage: number) {
    this.router.navigate(['/dashboard/blog'], { queryParams: { page: newPage } });
  }
  sanitizeTxt(txt: string): SafeHtml {
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.transform(txt));
    return this.html;
  }
  transform(htmlContent: any): any {
    const oembed = htmlContent.split('</oembed>');
    let body = '';
    interface OembedItem {
      item: string;
      index: number;
    }

    oembed.forEach((item: string, index: number): void => {
      body += oembed[index] + '</oembed>';
      const oembed1: string | undefined = item.split('url="')[1];
      if (oembed1) {
        const oembed2: string | undefined = oembed1.split('">')[0];
        if (oembed2) {
          const youtube: string | undefined = oembed2.split('https://www.youtube.com/watch?v=')[1];
          if (youtube) {
            body += '<div class="embed-responsive embed-responsive-16by9"><iframe src="https://youtube.com/embed/' + youtube + '" frameborder="0"; scrolling="no"; allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
          }
        }
      }
    });
    return body;
  }
  redirectToReadmore(postModel: Post): void {
    this.router.navigate(['/dashboard/blog-post'], { queryParams: { postId: postModel.id } });
  }
  //Add document
push_prev_startAt(prev_first_doc: DocumentSnapshot<any>): void {
  this.prev_strt_at.push(prev_first_doc);
}
  //Remove not required document 
  pop_prev_startAt(prev_first_doc: DocumentSnapshot<any>): void {
    this.prev_strt_at.forEach((element: DocumentSnapshot<any> | null, index: number, array: (DocumentSnapshot<any> | null)[]) => {
      if (prev_first_doc.data().id == element?.data().id) {
        array[index] = null;
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
