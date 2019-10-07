import { ResourceService } from './../../services/resource/resource.service';
import { Component, OnInit, ChangeDetectorRef, Input,  EventEmitter, Output, OnChanges, DoCheck } from '@angular/core';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-sunbird-custom-multi-select',
  templateUrl: './sunbird-custom-multi-select.component.html',
  styleUrls: ['./sunbird-custom-multi-select.component.scss']
})
export class SunbirdCustomMultiSelectComponent implements OnInit, OnChanges, DoCheck {
  @Input() inputData: Array<string>;
  @Input() field: object;
  @Input() valueField = 'name';
  checkBox: object;
  selectAllCheckBox = false;
  refresh = true;
  @Output() selectedValue = new EventEmitter<any>();

  constructor( private cdr: ChangeDetectorRef, public resourceService: ResourceService) { }
  checkbox(name) {
    if (this.checkBox[name]) {
      this.checkBox[name] = false;
      this.selectAllCheckBox = false;
    } else {
      this.checkBox[name] = true;
    }
  }
  selectAll(code) {
    this.inputData = [];
    this.selectAllCheckBox = !this.selectAllCheckBox;
    if (this.selectAllCheckBox) {
      _.forEach(this.field['range'], (value) => {
        this.inputData.push(value.name);
        this.checkBox[value.name] = true;
      });
    } else {
      this.inputData = [];
      _.forEach(this.field['range'], (value) => {
        this.checkBox[value.name] = false;
      });
    }
    this.selectedValue.emit( this.inputData);
    this.refresh = false;
    this.cdr.detectChanges();
    this.refresh = true;
  }
  selectedOption(event) {
    const fieldName = [];
    _.forEach(this.field['range'], (value, key) => {
      fieldName.push(value.name);
    });
    if (fieldName.length === event.length) {
      this.selectAllCheckBox = true;
    }
    this.selectedValue.emit(event);
  }
  ngOnInit() {
    this.checkBox = {};
    const name = [];
    if (this.inputData) {
      _.forEach(this.field['range'], (value, key) => {
        name.push(value.name);
      });
      if (name.length === this.inputData.length) {
        this.selectAllCheckBox = true;
      }
      _.forEach(this.inputData, (value) => {
        this.checkBox[value] = true;
      });
    }
  }
  ngOnChanges() {
    console.log('Sunbird custom multiselect onchanges');
    }

    ngDoCheck() {
      console.log('Sunbird custom docheck');
    }
}