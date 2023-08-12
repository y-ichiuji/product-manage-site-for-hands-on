import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlConst } from './pages/constants/url-const';
import { SignInPageComponent } from './pages/components/sign-in-page/sign-in-page.component';
import { ProductListingPageComponent } from './pages/components/product-listing-page/product-listing-page.component';
import { ProductRegisteringPageComponent } from './pages/components/product-registering-page/product-registering-page.component';
import { PurchaseHistoryListingPageComponent } from './pages/components/purchase-history-listing-page/purchase-history-listing-page.component';
import { StockRegisteringPageComponent } from './pages/components/stock-registering-page/stock-registering-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: UrlConst.SLASH + UrlConst.PATH_SIGN_IN,
    pathMatch: 'full',
  },
  { path: UrlConst.PATH_SIGN_IN, component: SignInPageComponent },
  {
    path: UrlConst.PATH_PRODUCT_LISTING,
    component: ProductListingPageComponent,
  },
  {
    path: UrlConst.PATH_PRODUCT_REGISTERING_NEW,
    component: ProductRegisteringPageComponent,
  },
  {
    path: UrlConst.PATH_PRODUCT_REGISTERING + UrlConst.SLASH + ':productCode',
    component: ProductRegisteringPageComponent,
  },
  {
    path: UrlConst.PATH_PURCHASE_HISTORY_LISTING,
    component: PurchaseHistoryListingPageComponent,
  },
  {
    path: UrlConst.PATH_STOCK_REGISTERING,
    component: StockRegisteringPageComponent,
  },
  {
    path: UrlConst.PATH_DUMMY_PURCHASING,
    loadChildren: () =>
      import(
        './super-user-pages/dummy-purchasing-page/dummy-purchasing-page-routing.module'
      ).then((m) => m.DummyPurchasingPageRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
