import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostsService {
    private baseUrl = 'https://ng-complete-course-84fb3-default-rtdb.firebaseio.com';
    private postsEndpoint = '/posts.json';

    error = new Subject<string>();

    constructor(private http: HttpClient) { }

    createAndStorePost(postData: Post) {
        // Notes: add .json in the end just cause of firebase requirements.
        // Notes: If i'm not subscribed on response Angular won't send a request!!!
        // Notes: If component doesn't care about the response -> can subscribe in service
        this.http.post<{ name: string }>(
            this.baseUrl + this.postsEndpoint,
            postData,
            {
                observe: 'body'
                //observe: 'response'
            }
        )
            .subscribe(responseData => {
                console.log(responseData)
            }, error => {
                this.error.next(error.message);
            });
    }

    fetchPosts() {
        // Notes: if I want to add many params
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');

        return this.http.get<{ [key: string]: Post }>(
            this.baseUrl + this.postsEndpoint,
            {
                headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
                // params: new HttpParams().set('print', 'pretty')
                params: searchParams
            })
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (let key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key });
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    // Notes: some common handling? Won't work without the subscription
                    // Send to analytics server, for example
                    return throwError(errorRes);
                }));
    }

    clearPosts() {
        return this.http.delete(
            this.baseUrl + this.postsEndpoint,
            {
                observe: 'events',
                //responseType: 'json'
            }
        ).pipe(
            tap(event => {
                console.log(event);
                if (event.type === HttpEventType.Response) {
                    console.log(event.body);
                }
            }));
    }
}