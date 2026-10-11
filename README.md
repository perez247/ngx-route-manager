# Ngx Route Manager

An angular library that provide an easy way to manage your routes. No more magic string for routing.

## Installation

`npm install ngx-route-manager`

## Setup

**Step 1** Create routes

Calling the generateNgxRoute creates an NgxRoute object which will be used through out the application

```
import { generateNgxRoute } from "ngx-route-manager";

export const ngxRoutes = {
	home: generateNgxRoute(), // generateNgxRoute creates an object
	users: generateNgxRoute('users'),
	singleUser: generateNgxRoute('users/:id', ['debug']),
	productCart: generateNgxRoute('product/:productId/cart/:cartId'),
}
```

**Step 2** Add to the angular routes

```
export const routes: Routes = [
	{
		path: ngxRoutes.home.path,
		component: HomeComponent
	},
	{
		path: a.users.path,
		component: UsersComponent
	},
	{
		path: a.singleUser.path,
		component: ViewSingleUserComponent
	},
	{
		path: a.productCart.path,
		component: ViewProductCartComponent
	},

	// You can add segments
	{
		path: ngxRoutes.productCart.segments.cart // cart,
		component: ...
	},
	{
		path: ngxRoutes.singleUser.segments.users// users,
		component: ...
	}
]
```

**Step 3** Register in App.modules.ts or app.config.ts

```
import { NgxRouteManagerModule } from 'ngx-route-manager';

// Using with App.modules.ts (none standalone)
imports: [
	...
	NgxRouteManagerModule.forRoot(ngxRoutes),
	...
]

// Using with app.config.ts (standalone)
providers: [
	...
	importProvidersFrom(NgxRouteManagerModule.forRoot(ngxRoutes)),
	...
]
```

## Use

Simply call the route created into the component, directive etc for use

Component.ts

```
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxRouteManagerService } from 'ngx-route-manager';

@Component({})
export class YourComponent {
  routes = ngxRoutes;
  private route = inject(ActivatedRoute);
  private routeManagerService = inject(NgxRouteManagerService);

  constructor() {
    // Optionally update the active route using NgxRouteManagerService
    this.routeManagerService.updateRoute(this.route);
  }

  getRoutes() {
    const homeRoute = routes.home.fn(); // outputs: ''
    const usersRoute = routes.users.fn(); // outputs: 'users'
    const singleUserRoute = routes.singleUser.fn({ id: '1234' }, { debug: 'true' }); // outputs: 'users/1234?debug=true'
    const productCartRoute = routes.productCart.fn({ productId: '1234', cartId: 'abgh' }) // outputs: 'product/1234/cart/abgh'
  }

  getParsedRoutes() {
    const singleUserRoute = routes.singleUser.url({ id: '1234' }, { debug: 'true' });
    // outputs: { route: ['users/1234'], extras: { queryParams: { debug: 'true' } } }
  }

  getSnapshot() {
    // Pass ActivatedRoute directly or ensure routeManagerService.updateRoute(this.route) was called
    const singleUserId = routes.singleUser.params.id.snapshotValue(this.route);
    const productId = routes.productCart.params.productId.snapshotValue();
    const cartId = routes.productCart.params.cartId.snapshotValue();
    const debug = routes.singleUser.queryParams.debug.snapshotValue();
  }

  listenForValueChanges() {
    // listenForValue() returns an observable that checks for the change in value for the param in the url.
    // Accepts an optional ActivatedRoute parameter to update the active route.
    const singleUserIdSub = routes.singleUser.params.id.listenForValue(this.route).subscribe(...);
    const productIdSub = routes.productCart.params.productId.listenForValue().subscribe(...);
    const cartIdSub = routes.productCart.params.cartId.listenForValue().subscribe(...);
    const debugSub = routes.singleUser.queryParams.debug.listenForValue().subscribe(...);

    // Remember to destroy subscriptions
  }
}
```

Component.html

```
html file

<h2>Links</h2> -------------------------------------------------------------------

<-- / -->
<a [routerLink]="['/' + routes.home.fn()]">Home</a>

<-- /users -->
<a [routerLink]="['/' + routes.users.fn()]">User List</a>

<-- /users/1234?debug=true -->
<a [routerLink]="['/' + routes.singleUser.fn({ id: '1234' }, { debug: 'true' })]">Single user</a>

<-- /product/111/cart/abgh -->
<a [routerLink]="['/' + routes.productCart.fn({ productId: '1234', cartId: 'abgh' })]">Single user</a>

<h2>Snapshot</h2> -------------------------------------------------------------------

<p>Single User Id: {{ routes.singleUser.params.id.snapshotValue() }}</p>
<p>Product Id: {{ routes.productCart.params.productId.snapshotValue() }}</p>
<p>Cart Id: {{ routes.productCart.params.cartId.snapshotValue() }}</p>
<p>Debug: {{ routes.singleUser.queryParams.debug.snapshotValue() }}</p>

<h2>Subscriptions</h2> -------------------------------------------------------------------

<p>Single User Id: {{ routes.singleUser.params.id.listenForValue() | async }}</p>
<p>Product Id: {{ routes.productCart.params.productId.listenForValue() | async }}</p>
<p>Cart Id: {{ routes.productCart.params.cartId.listenForValue() | async }}</p>
<p>Debug: {{ routes.singleUser.queryParams.debug.listenForValue() | async }}</p>
```

## Properties

### NgxRoute

generateNgxRoute return a NgxRoute Object

| Name                              | Description                                                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| path: string                      | The path used for setting the routes in app.routes/app-routing.module.ts                                                    |
| fn: (params< T >) => string       | The function that enforces the right params in order to generate the right url string. This is deprecated in favor of url() |
| url: (params< T >) => NgxParseUrl | The function that enforces the right params in order to generate a parsed url object                                        |
| params: RouteParams               | Contains all the params (**NgxParam**) generated from the url string pattern passed                                         |
| queryParams: RouteQueryParams     | Contains all the query params (**NgxParam**) generated from the query params keys passed                                    |
| segments:                         | Contains the different none params of the url string pattern passed                                                         |

### NgxParam / NgxQueryParam

These are the types of object found in the RouteParams / RouteQueryParams.

| Name                                 | Description                                                                                                                                                                                |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| snapshotValue(route?: ActivatedRoute): string | Returns the current value of the param in the url if found (same as ActivatedRoute:snapshot). Accepts an optional `ActivatedRoute` to update the active route before evaluating. |
| listenForValue(route?: ActivatedRoute): observable< string > | Returns an observable that listens for changes in the url, to get the param value (same as ActivatedRoute:paramMap). Accepts an optional `ActivatedRoute` to update the active route. |

### NgxRouteManagerService

`NgxRouteManagerService` provides an injectable service to manage and update the internal active route (`internalSignalRoute`).

```typescript
import { NgxRouteManagerService } from 'ngx-route-manager';

// Inject service into component or guard
constructor(private routeManagerService: NgxRouteManagerService, private route: ActivatedRoute) {
  this.routeManagerService.updateRoute(this.route);
}
```

| Method / Property | Description |
| ----------------- | ----------- |
| `updateRoute(route: ActivatedRoute): void` | Updates the internal signal route with the current component's `ActivatedRoute`. |
| `currentRoute: ActivatedRoute \| undefined` | Returns the currently stored `ActivatedRoute`. |

**Note:** The file `generate-path.ts` has been renamed to `generate-ngx-route.ts`.
