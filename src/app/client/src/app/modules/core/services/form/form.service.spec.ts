import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormService, ContentService, CoreModule } from '@sunbird/core';
import { SharedModule } from '@sunbird/shared';
import { Observable } from 'rxjs/Observable';
import { mockFormData } from './form.mock.spec.data';

  describe('FormService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, CoreModule, SharedModule],
        providers: [FormService, ContentService]
      });
    });

    it('should fetch content creation form details', () => {
      const service = TestBed.get(FormService);
      const contentService = TestBed.get(ContentService);
      const content = 'textbook';
      const type = 'textbook';
      const action = 'textbook';
      const framework = 'textbook';
      spyOn(contentService, 'post').and.returnValue(Observable.of(mockFormData.success));
      service.getFormConfig(type, action, content, framework);
      expect(service).toBeTruthy();
    });
    it('should emit error on api failure', () => {
      const service = TestBed.get(FormService);
      const contentService = TestBed.get(ContentService);
      const content = 'textbook';
      const type = 'textbook';
      const action = 'textbook';
      const framework = 'textbook';
      spyOn(contentService, 'post').and.returnValue(Observable.of(mockFormData.error));
      service.getFormConfig(type, action, content, framework);
      expect(service).toBeTruthy();
    });
  });