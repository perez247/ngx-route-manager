# Ngx Route Manager

An angular library that provide an easy way to manage your routes. No more magic string for routing.

## Installation

`npm install ngx-route-manager`

## Setup

**Step 1** Create routes

    ```
    import { generateNgxRoute } from  "ngx-route-manager";

    export const ngxRoutes = {
    	home: generateNgxRoute(), // generateNgxRoute creates an object
    	users: generateNgxRoute('users'),
    	singleUser: generateNgxRoute('users/:id'),
    	productCart: generateNgxRoute('product/:productId/cart/:cartId'),
    }

    // will be used later to define generic types
    export type ngxRouteType = typeof ngxRoutes
    ```

**Step 2** Add to the angular routes

    export  const  routes:  Routes  = [
        ...
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
    	...
    ]

**Step 3** Register in App.modules.ts or app.config.ts

```
import { NgxRouteManagerModule } from  'ngx-route-manager';

// Using with App.modules.ts (none standalone)
imports: [
	...
	NgxRouteManagerModule.forRoot<ngxRouteType>(ngxRoutes),
	...
]

// Using with app.config.ts (standalone)
providers: [
	...
	importProvidersFrom(NgxRouteManagerModule.forRoot<ngxRouteType>(ngxRoutes)),
	...
]
```

## Use

**Service**
The service contains a `routes` property which should be of the custom generic type `ngxRouteType`. It is advised to use the `routes` from the service because some internal functions have been performed on it. This inlcudes instantiating the ActivatedRoute else you can use `ngxRoutes` for most of your tasks.

```
import { NgxRouteManagerService } from  'ngx-route-manager';

@Component({
...
providers: [NgxRouteManagerService],
...
})
export class YourComponent {
  constructor(private ngxRMService: NgxRouteManagerService<ngxRouteType>) {}

  getRoutes() {
    const homeRoute = this.ngxRMService.routes.home.fn(); // outputs: ''
    const usersRoute = this.ngxRMService.routes.users.fn(); // outputs: 'users'
    const singleUserRoute = this.ngxRMService.routes.singleUser.fn({ id: '1234'}); // outputs: 'users/1234'
    const productCartRoute = this.ngxRMService.routes.productCart.fn({ productId: '1234', cartId: 'abgh'}) // outputs: 'product/1234/cart/abgh'
  }

  getSnapshot() {
	const singleUserId = this.ngxRMService.routes.singleUser.params.id.snapshotValue();
	const productId = this.ngxRMService.routes.productCart.params.productId.snapshotValue();
	const cartId = this.ngxRMService.routes.productCart.params.cartId.snapshotValue();
  }

  listenForValueChanges() {
    // listenForValue() returns an observable that checks for the change in value for the param in the url
	const singleUserIdSub = this.ngxRMService.routes.singleUser.params.id.listenForValue().subscribe(...);
	const productIdSub = this.ngxRMService.routes.productCart.params.productId.listenForValue().subscribe(...);
	const cartIdSub = this.ngxRMService.routes.productCart.params.cartId.listenForValue().subscribe(...);

	// Remember to destroy subscriptions
  }
}
```

**Directive**
Same with the service, the directive contains a `routes` property which should be of the custom generic type `ngxRouteType`.

```
import { NgxRmDirective } from  'ngx-route-manager';

@Component({
...
imports: [NgxRmDirective], // For standalone components
...
})
export class YourComponent {
	routeType:  ngxRouteType  = {} as  ngxRouteType; // Type is needed for the directive
	...
}

html file
<!-- You can pass the directive here just to access the ngx routes -->
<span  [NgxRouteManager]="routeType"  #ngxRM="NgxRouteManager"></span>

<h2>Links</h2> -------------------------------------------------------------------

<-- / -->
<a  [routerLink]="['/'  +  ngxRM.routes.home.fn()]">Home</a>
<-- /users -->
<a  [routerLink]="['/'  +  ngxRM.routes.users.fn()]">User List</a>
<-- /users/1234 -->
<a  [routerLink]="['/'  +  ngxRM.routes.singleUser.fn({ id: '1234' })]">Single user</a>
<-- /product/111/cart/abgh -->
<a  [routerLink]="['/'  +  ngxRM.routes.productCart.fn({ productId: '1234', cartId: 'abgh' })]">Single user</a>

<h2>Snapshot</h2> -------------------------------------------------------------------

<p>Single User Id: {{ ngxRM.routes.singleUser.params.id.snapshotValue() }}</p>
<p>Product Id: {{ ngxRM.routes.productCart.params.productId.snapshotValue() }}</p>
<p>Cart Id: {{ ngxRM.routes.productCart.params.cartId.snapshotValue() }}</p>

<h2>Subscriptions</h2> -------------------------------------------------------------------

<p>Single User Id: {{ ngxRM.routes.singleUser.params.id.listenForValue() | async }}</p>
<p>Product Id: {{ ngxRM.routes.productCart.params.productId.listenForValue() | async }}</p>
<p>Cart Id: {{ ngxRM.routes.productCart.params.cartId.listenForValue() | async }}</p>
```
