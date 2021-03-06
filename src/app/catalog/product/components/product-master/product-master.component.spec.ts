import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ProductMasterComponent } from './product-master.component';
import { loadProductDetails, loadProducts } from '@app/catalog/product/store/product.actions';
import { productFeatureKey } from '@app/catalog/product/store/product.reducer';
import { catalogFeatureKey } from '@app/catalog/store/catalog.reducer';

describe('ProductMasterComponent', () => {
  let component: ProductMasterComponent;
  let fixture: ComponentFixture<ProductMasterComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductMasterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({initialState: {[catalogFeatureKey]: {[productFeatureKey]: {}}}})
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMasterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProducts action on init', () => {
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(loadProducts());
  });

  describe('loadProductDetails', () => {
    it('should dispatch loadProductDetails action with product id', () => {
      component.loadProductDetails(42);
      expect(store.dispatch).toHaveBeenCalledWith(loadProductDetails({productId: 42}));
    });
  });
});
