import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;
  partialLoading: boolean = false;
  title = 'client';
  drawerOpen = true;
  newComment: string = "";
  ip:string = "";
  data: any[] = [];
  currentData: any = undefined;

  constructor(private service: ApiService) {
    this.loading = true;
    this.service.getIp()
    .subscribe(response => {
      this.ip = response.IPv4;
    });

    this.service.getData()
    // .pipe(
    //   catchError(err => {
    //     console.log(err);
    //     return new Error(err);
    //   }))
    .subscribe((response: any) =>  {
      console.log({response}, response.ip)
        this.data = response.data;
        this.currentData = response.data[0]
        this.loading = false;
    });
  }

  toggleSidebar() {
    this.drawerOpen = !this.drawerOpen;
  }

  setView(id: number) {
    this.currentData = this.data.find(item => item.id === id) || {};
  }

  postComment() {
    console.log(this.newComment);
    this.partialLoading = true;
    this.service.postComment(
      {comments: this.newComment, ip_address_location: this.ip, episode_id: this.currentData.id}
      ).subscribe(response => {
        const index = this.data.findIndex(item => item.id === this.currentData.id);
        this.data[index].episode_comments.unshift(response.data);
        this.partialLoading = false;
      });
    this.newComment="";
  }
}
