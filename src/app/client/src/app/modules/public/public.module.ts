import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@sunbird/core';
import { LandingPageComponent } from './components';
import { PublicPlayerService, LandingpageGuard } from './services';
import { SharedModule } from '@sunbird/shared';
import { PublicRoutingModule } from './public-routing.module';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonLicenseComponent } from './components/common-license/common-license.component';
import { PeopleInvlovedComponent } from './components/people-invloved/people-invloved.component';
import { AboutUSComponent } from './components/about-us/about-us.component';
import { BlogComponent } from './components/blog/blog.component';
import { ExploreAssetComponent } from './components/explore-asset/explore-asset.component';
import { FrameworkComponent } from './components/framework/framework.component';
import { CoreComponent } from './components/core/core.component';
import { ExploreThinkingComponent } from './components/explore-thinking/explore-thinking.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { ViewuserComponent } from './components/viewuser/viewuser.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { PublicFooterComponent } from './components/public-footer/public-footer.component';
import { ExploreDetailPageComponent } from './components/explore-detail-page/explore-detail-page.component';
import { UserSearchServicePublicService } from './services/searchService/user-search-service-public.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LandingPageComponent,
    ViewuserComponent, UserEditComponent,
   PublicFooterComponent, ContactUsComponent,
   CommonLicenseComponent, PeopleInvlovedComponent, AboutUSComponent, BlogComponent,
    ExploreAssetComponent, FrameworkComponent, CoreComponent, ExploreThinkingComponent,
     ExploreDetailPageComponent, AdduserComponent, WorkspaceComponent],
  providers: [PublicPlayerService, DeviceDetectorService, LandingpageGuard, UserSearchServicePublicService]
})
export class PublicModule { }
