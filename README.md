# Ngx Route Manager

An angular library that provides an easy way to manage your routes. No more magic strings for routing.

## Installation

`npm install ngx-route-manager`

## Setup

**Step 1** Create routes

Calling `generateNgxRoute` creates an `NgxRoute` object which will be used throughout the application. It is recommended to define these in a central file.

```typescript
import { generateNgxRoute } from "ngx-route-manager";

export const ngxRoutes = {
  home: generateNgxRoute(),
  users: generateNgxRoute('users'),
  singleUser: generateNgxRoute('users/:id', ['debug']),
  productCart: generateNgxRoute('product/:productId/cart/:cartId'),
}
```

**Step 2** Add to the angular routes

Use the `.path` property to define your Angular route configurations.

```typescript
export const routes: Routes = [
  {
    path: ngxRoutes.home.path,
    component: HomeComponent
  },
  {
    path: ngxRoutes.users.path,
    component: UsersComponent
  },
  {
    path: ngxRoutes.singleUser.path,
    component: ViewSingleUserComponent
  },
  {
    path: ngxRoutes.productCart.path,
    component: ViewProductCartComponent
  }
]
```

**Step 3** No Global Registration Required

The library is purely service-driven. No module registration or providers are required in your `AppModule` or `ApplicationConfig`.

## Use

Inject `NgxRouteManagerService` to access parameter values reactively or as snapshots.

### Component.ts

```typescript
import { Component, inject } from '@angular/core';
import { NgxRouteManagerService } from 'ngx-route-manager';
import { ngxRoutes } from './ngx-routes';

@Component({ ... })
export class YourComponent {
  private routeManager = inject(NgxRouteManagerService);
  routes = ngxRoutes;

  getRoutes() {
    // Generate URL strings for navigation
    const homeRoute = this.routes.home.fn(); // ""
    const singleUserRoute = this.routes.singleUser.fn({ id: '1234' }, { debug: 'true' }); // "users/1234?debug=true"
  }

  getSnapshots() {
    // Get current values immediately
    const id = this.routeManager.getParamSnapshot(this.routes.singleUser.params.id);
    const debug = this.routeManager.getQueryParamSnapshot(this.routes.singleUser.queryParams.debug);
  }

  getStreams() {
    // Get Observables for reactive updates
    const id$ = this.routeManager.getParamStream(this.routes.singleUser.params.id);
    const debug$ = this.routeManager.getQueryParamStream(this.routes.singleUser.queryParams.debug);
  }
}
```

### Component.html

```html
<!-- Navigation -->
<!-- Use the generated URL string directly -->
<a [routerLink]="'/' + routes.singleUser.fn({ id: '1234' })">View User</a>

<!-- Display values reactively using the async pipe -->
<p>User ID: {{ routeManager.getParamStream(routes.singleUser.params.id) | async }}</p>
<p>Debug: {{ routeManager.getQueryParamStream(routes.singleUser.queryParams.debug) | async }}</p>
```

## API Reference

### NgxRouteManagerService

| Method | Description |
| --- | --- |
| `getParamSnapshot(param, route?)` | Gets the current value of a path parameter. |
| `getParamStream(param, route?)` | Returns an `Observable<string>` that emits the parameter value on changes. |
| `getQueryParamSnapshot(param, route?)` | Gets the current value of a query parameter. |
| `getQueryParamStream(param, route?)` | Returns an `Observable<string>` that emits the query parameter value on changes. |

*Note: You can optionally pass an `ActivatedRoute` to these methods to scope the lookup to a specific branch of the route tree. By default, the service resolves the correct route based on the `NgxRoute` configuration.*

### NgxRoute

| Property | Description |
| --- | --- |
| `path` | The path string for Angular route configuration. |
| `fn(params, queryParams)` | Generates a URL string based on provided params and query params. |
| `url(params, queryParams)` | Generates a parsed URL object (useful for `Router.navigate`). |
| `params` | Collection of `NgxParam` objects derived from the path pattern. |
| `queryParams` | Collection of `NgxQueryParam` objects derived from the provided keys. |
| `segments` | Static segments of the path pattern. |
