import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  episodeUrl = environment.baseUrl + '/episode';
  commentUrl = environment.baseUrl + '/comment';

  getData() {
    return this.http.get<any>(this.episodeUrl);
  }

  getIp() {
    return this.http.get<any>('https://geolocation-db.com/json/');
  }

  postComment(data: any) {
    return this.http.post<any>(this.commentUrl, data);
  }
}
