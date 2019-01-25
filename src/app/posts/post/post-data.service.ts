import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  private END_POINT: string = environment.api;

  constructor(private readonly http: Http, private readonly socket: Socket) {
    this.socket.on(`newCommentNotify:${1}`, () => {
      alert(1);
    });
  }

  get(id: number) {
    return this.http
      .get(`${this.END_POINT}/post/${id}`)
      .pipe(map(r => r.json()));
  }

  isBookMarked(postId: number, userId: number) {
    return this.http
      .get(`${this.END_POINT}/bookmarked/${postId}/${userId}`)
      .pipe(map(r => r.json()));
  }

  bookMark(postId: number, userId: number) {
    return this.http
      .post(`${this.END_POINT}/bookmark`, {
        postId,
        userId
      })
      .pipe(map(r => r.json()));
  }

  unBookmark(postId: number, userId: number) {
    return this.http
      .post(`${this.END_POINT}/deleteBookmark`, {
        postId,
        userId
      })
      .pipe(map(r => r.json()));
  }
}
