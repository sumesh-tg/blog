import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  postModelArray: Post[];
  postModel: Post;
  html: SafeHtml;
  timeLeft: number = 30;
  interval;

  constructor(private route: ActivatedRoute, private postService: PostService, private sanitizer: DomSanitizer,
    private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      var id = params['postId'];
      console.log(id);
      this.postService.getPostById(id).subscribe(postData => {
        console.log("check by id", postData);
        this.postModelArray = postData.map(e => {
          const data = e.payload.doc.data();
          let id = e.payload.doc.id;
          return { id, ...(data as Object) } as Post;
        });
        if (this.postModelArray.length > 0) {
          this.postModel = this.postModelArray[0];
          console.log();
        } else {
          alert("Post not found!");
        }
      });
    });
    var url = this.router.url;
    if (url.indexOf("preview") > 0) {
      this.postModel = JSON.parse(localStorage.getItem("postModel"));
      this.startTimer();

    }
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.toastrService.clear();
        var toastInfo = this.toastrService.error(`<p>The preview will close automatically after ${this.timeLeft} seconds...!</p>`, 'Notice!', {
          timeOut: 40000,
          enableHtml: true,
          closeButton: false,
          disableTimeOut: true,
          tapToDismiss: false,
          positionClass:'toast-top-right',
          easeTime:0
        });
        console.log(toastInfo);
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
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

}
