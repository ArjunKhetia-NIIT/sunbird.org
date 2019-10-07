import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService, ConfigService } from '@sunbird/shared';
import { ISelectFilter } from '../../../workspace/interfaces/selectfilter';
import * as _ from 'lodash-es';
import { Subject , Observable, of} from 'rxjs';
import { debounceTime, distinctUntilChanged, delay, flatMap } from 'rxjs/operators';
import { IInteractEventEdata, TelemetryService } from '@sunbird/telemetry';

@Component({
  selector: 'app-content-filter',
  templateUrl: './content-filter.component.html',
  styleUrls: ['./content-filter.component.scss']
})
export class ContentFilterComponent implements OnInit {
  modelChanged: Subject<string> = new Subject<string>();
  /**
   * To navigate to other pages
   */
  route: Router;
  /**
   * To send activatedRoute.snapshot to router navigation
   * service for redirection to draft  component
  */
  private activatedRoute: ActivatedRoute;
  /**
   * value typed
   */
  query: string;
  /**
   * SortingOptions
  */
  sortingOptions: Array<string>;
  /**
    * To show / hide sortIcon
   */
  sortIcon = true;
  /**
    * position for the popup
  */
  position: string;
  /**
    * To call resource service which helps to use language constant
  */
  public resourceService: ResourceService;
  /**
  * To get url, app configs
  */
  public config: ConfigService;

  sortByOption: string;
  /**
  * type of filter
  */
  public filterType: any;
  /**
  * label for filter selected
  */
  label: Array<string>;
  /**
  * redirect url
  */
  public redirectUrl: string;
  queryParams: any;
  filterIntractEdata: IInteractEventEdata;

  /**
   * Constructor to create injected service(s) object
   Default method of Draft Component class
   * @param {SearchService} SearchService Reference of SearchService
   * @param {UserService} UserService Reference of UserService
   * @param {Router} route Reference of Router
   * @param {PaginationService} paginationService Reference of PaginationService
   * @param {ActivatedRoute} activatedRoute Reference of ActivatedRoute
   * @param {ConfigService} config Reference of ConfigService
 */
  constructor(resourceService: ResourceService, config: ConfigService,
    activatedRoute: ActivatedRoute,
    route: Router, public telemetryService: TelemetryService) {
    this.route = route;
    this.activatedRoute = activatedRoute;
    this.resourceService = resourceService;
    this.config = config;
    this.position = 'bottom right';
    this.route.onSameUrlNavigation = 'reload';
    this.label = this.config.dropDownConfig.FILTER.WORKSPACE.label;
    this.sortingOptions = this.config.dropDownConfig.FILTER.RESOURCES.sortingOptions;
  }

  ngOnInit() {
    this.filterType = this.config.appConfig.allmycontent.filterType;
    this.redirectUrl = this.config.appConfig.allmycontent.inPageredirectUrl;
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.queryParams = { ...params };
        this.query = this.queryParams['query'];
        this.sortByOption = this.queryParams['sort_by'];
        _.forIn(params, (value, key) => {
          if (typeof value === 'string' && key !== 'query') {
            this.queryParams[key] = [value];
          }
        });
      });
      this.modelChanged.pipe(debounceTime(1000),
      distinctUntilChanged(),
      flatMap(search => of(search).pipe(delay(500)))
      ).
      subscribe(query => {
        console.log('query = ', query);
        this.query = query;
        this.handleSearch();
      });
      this.filterIntractEdata = {
        id: 'filter',
        type: 'click',
        pageid: 'my-asset-page'
      };
  }
  public handleSearch() {
    if (this.query.length > 0) {
      this.queryParams['query'] = this.query;
    } else {
      delete this.queryParams['query'];
    }
    this.route.navigate(['myassets'], { queryParams: this.queryParams});
  }
  keyup(event) {
    this.query = event;
    this.modelChanged.next(this.query);
  }

  applySorting(sortByOption) {
    this.sortIcon = !this.sortIcon;
    this.queryParams['sortType'] = this.sortIcon ? 'desc' : 'asc';
     this.queryParams['sort_by'] = sortByOption;
    this.route.navigate(['myassets'], { queryParams: this.queryParams });
  }
  removeFilterSelection(filterType, value) {
    const itemIndex = this.queryParams[filterType].indexOf(value);
    if (itemIndex !== -1) {
      this.queryParams[filterType].splice(itemIndex, 1);
    }
    this.route.navigate(['myassets'], { queryParams: this.queryParams  });
  }
  /*telemetry implementation for space, function for getting query on hitting enter*/
  onEnter(query) {
    this.telemetryService.search({
      context: {
        env: 'myassets'
      },
      edata: {
        type: 'asset',
        query: query,
        size: 0,
        topn: []
      }
    });
  }
}