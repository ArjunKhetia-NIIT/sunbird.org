import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components';
import { LandingpageGuard } from './services';
import { CommonLicenseComponent } from './components/common-license/common-license.component';
import { PeopleInvlovedComponent } from './components/people-invloved/people-invloved.component';
import { AboutUSComponent } from './components/about-us/about-us.component';
import { BlogComponent } from './components/blog/blog.component';
import { ExploreAssetComponent } from './components/explore-asset/explore-asset.component';
import { CoreComponent } from './components/core/core.component';
import { ExploreThinkingComponent } from './components/explore-thinking/explore-thinking.component';
import { FrameworkComponent } from './components/framework/framework.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent, canActivate: [LandingpageGuard],
    data: { telemetry: { env: 'public', pageid: 'landing-page', type: 'edit', subtype: 'paginate' } }
  },
  {
    path: 'explore', loadChildren: './module/explore/explore.module#ExploreModule'
  },
  {
    path: 'explore-library', loadChildren: './module/library-content/library-content.module#LibraryContentModule'
  },
  {
    path: ':slug/explore-library', loadChildren: './module/library-content/library-content.module#LibraryContentModule'

  },
  // {
  //   path: ':slug/contactUs', loadChildren:'./module/contact-us/contact-us.module#ContactUsModule'
  // },
  // {
  //   path: 'contactUs', loadChildren:'./module/contact-us/contact-us.module#ContactUsModule'
  // },
  {
    path: ':slug/contactUs' , component: ContactUsComponent
  },
  {
    path: ':slug/explore', loadChildren: './module/explore/explore.module#ExploreModule'
  },
  {
    path: 'explore-course', loadChildren: './module/course/course.module#CourseModule'
  },
  {
    path: ':slug/explore-course', loadChildren: './module/course/course.module#CourseModule'
  },
  {
    path: 'explore-courses', loadChildren: './module/course/course.module#CourseModule'
  },
  {
    path: ':slug/explore-courses', loadChildren: './module/course/course.module#CourseModule'
  },
  {
    path: ':slug/signup', loadChildren: './module/signup/signup.module#SignupModule'
  },
  {
    path: 'signup', loadChildren: './module/signup/signup.module#SignupModule'
  },
  {
    path: ':slug/sign-in/sso', loadChildren: './module/sign-in/sso/sso.module#SsoModule'
  },
  {
    path: 'sign-in/sso', loadChildren: './module/sign-in/sso/sso.module#SsoModule'
  },

  {
    path: 'license', component: CommonLicenseComponent
  },
  {
    path: 'people', component: PeopleInvlovedComponent
  },
  {
    path: 'aboutUs', component: AboutUSComponent
  },
  {
    path: 'blog', component: BlogComponent
  },
  {
    path: 'exploreAsset', component: ExploreAssetComponent
  },
  {
    path: ':slug/core', component: CoreComponent
  },
  {
    path: 'exploreThinking', component: ExploreThinkingComponent
  }
  , {
    path: ':slug/framework', component: FrameworkComponent
  },
  {
    path: 'play', loadChildren: './module/player/player.module#PlayerModule'
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
