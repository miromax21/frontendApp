import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthorizationErrorsEnum } from '../shared/enums/authorization-errors.enum';
import { environment } from 'environments/environment';
import { ServiceLocator } from '../shared/service-locator';
import { Utils } from '../shared/utils';
import { IArticle } from '../shared/interfaces/article.Interface';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Article } from './article';
const ALL_ARTICLESS_URL: string = "http://localhost:8087/article/all-articles"
const ARTICLESS_URL: string = "http://localhost:8087/article/article";
const UPDATE_ALL_ARTICLESS_URL: string = "http://localhost:8087/article/updateArticles";




@Injectable()
export class ArticleService {

	protected _http: HttpClient;
	constructor() {
		this._http = ServiceLocator.Injector.get(HttpClient);
	}
	//Fetch all articles
	// getAllArticles(): Observable<Article[]> {
	// 	return this.http.get(this.allArticlesUrl)
	// 		.map(this.extractData)
	// 		.catch(this.handleError);

	// }

	getAllArticles(): Promise<Article[]> {
		return this._http.get<Article[]>(ALL_ARTICLESS_URL, {})
			.toPromise()
			.then((articles: Article[]): Article[] | Promise<any> => {
				if (articles.length === 0)
					return Promise.reject(null);
				return articles;
			});
	}
	createArticle(article: Article): Promise<Article | Article[]> {
		return this._http.post<Article>(ARTICLESS_URL, article)
			.toPromise<Article>()
			.then<any>((data: any | Response): Promise<Article> => {
				debugger
				console.log(data.status);
				return Promise.resolve(data);
			})
			.catch((error: HttpErrorResponse) => {
				return Promise.reject(error);
			});
	}
	updateArticles(articles: Article[]) {
		return this._http.post<Article>(UPDATE_ALL_ARTICLESS_URL, articles)
			.toPromise<Article>()
			.then<any>((data: any | Response): Promise<Article> => {
				return Promise.resolve(data);
			})
			.catch((error: HttpErrorResponse) => {
				return Promise.reject(error);
			});
	}
	// //Fetch article by id
	// getArticleById(articleId: string): Observable<Article> {
	// 	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	// 	let cpParams = new URLSearchParams();
	// 	cpParams.set('id', articleId);
	// 	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	// 	return this.http.get(this.articleUrl, options)
	// 		.map(this.extractData)
	// 		.catch(this.handleError);
	// }
	// //Update article
	// updateArticle(article: Article): Observable<number> {
	// 	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	// 	let options = new RequestOptions({ headers: cpHeaders });
	// 	return this.http.put(this.articleUrl, article, options)
	// 		.map(success => success.status)
	// 		.catch(this.handleError);
	// }
	// //Delete article	
	// deleteArticleById(articleId: string): Observable<number> {
	// 	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	// 	let cpParams = new URLSearchParams();
	// 	cpParams.set('id', articleId);
	// 	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	// 	return this.http.delete(this.articleUrl, options)
	// 		.map(success => success.status)
	// 		.catch(this.handleError);
	// }
	private extractData(res: Response) {
		let body = res.json();
		return body;
	}
	private handleError(error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
	}
}