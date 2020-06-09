import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  postModelArray: Post[];
  postModel: Post;
  html: SafeHtml;

  constructor(private route: ActivatedRoute, private postService: PostService, private sanitizer: DomSanitizer) { }

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
