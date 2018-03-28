import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from './article.service';
import { Article } from './article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  //Component properties
  allArticles: Article[];
  statusCode: number;
  articleUpdateId: number = null;
  requestProcessing: boolean = false;
  articleIdToUpdate: boolean = false;
  processValidation: boolean = false;
  //Create form
  articleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });
  //Create constructor to get service instance
  constructor(private articleService: ArticleService) {
  }
  ngOnInit(): void {
    this.getAllArticles();
  }
  getAllArticles() {
    this.articleService.getAllArticles().then(
      data => this.allArticles = data,
      errorCode => this.statusCode = errorCode);
  }
  saveAll() {
    this.articleService.updateArticles(this.allArticles);
  }
  updateArticle(articleId: number) {
    let updateArticle = this.allArticles.find(x => x.articleId == articleId);
    updateArticle.category = this.articleForm.get('category').value.trim();
    updateArticle.title = this.articleForm.get('title').value.trim();
  }
  //Handle create and update article
  onArticleFormSubmit() {
    this.processValidation = true;
    if (this.articleForm.invalid) {
      return;
    }
    this.preProcessConfigurations();
    var title = this.articleForm.get('title').value.trim();
    var category = this.articleForm.get('category').value.trim();
    if (this.articleUpdateId == null) {
      let article = new Article(null, title, category);
      this.articleService.createArticle(article).then((_article: Article | any) => {
        this.allArticles.unshift(_article);
        this.backToCreateArticle();
      })
        .catch(function genericError(error) {
          alert(error.status); // Error: Not Found
        });
    }
    else {
      var updateArticle = this.allArticles.find(x => x.articleId == this.articleUpdateId);
      updateArticle.category = category;
      updateArticle.title = title;
    }
  }
  // //Load article by id to edit
  loadArticleToEdit(articleId: number) {
    this.articleIdToUpdate = true;
    this.articleUpdateId = articleId;
    var editArticle: Article = this.allArticles.filter(x => x.articleId == articleId)[0];
    this.articleForm.setValue({ title: editArticle.title, category: editArticle.category });
  }
  // //Delete article
  deleteArticle(_articleId: number) {
    this.preProcessConfigurations();
    for (var i = this.allArticles.length; i--;) {
      if (this.allArticles[i].articleId == _articleId) this.allArticles.splice(i, 1);
    }
  }
  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  //Go back from update to create
  backToCreateArticle() {
    this.articleIdToUpdate = null;
    this.articleForm.reset();
    this.processValidation = false;
  }
}
