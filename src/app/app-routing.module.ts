import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { ArticleComponent } from './articles/article.component';
import { RoutingConsts } from './shared'
const routes: Routes = [
    { path: RoutingConsts.login, loadChildren: './authorization/authorization.module#AuthorizationModule' },
    { path: RoutingConsts.article, component: ArticleComponent },
    { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}