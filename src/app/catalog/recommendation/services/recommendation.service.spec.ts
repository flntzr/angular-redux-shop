import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecommendationService } from './recommendation.service';
import { RecommendationTestData } from '@models/recommendation.testdata';

describe('RecommendationService', () => {
  let service: RecommendationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecommendationService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(RecommendationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadRecommendations', () => {
    it('should retrieve products from api', (done) => {
      service.loadRecommendations().subscribe(products => {
        expect(products).toEqual(RecommendationTestData.validRecommendations);
        done();
      });

      httpMock.expectOne({url: 'http://www.mocky.io/v2/5b8d2fa33300007800c158be', method: 'GET'})
        .flush(RecommendationTestData.validRecommendations);
      httpMock.verify();
    });
  });
});
