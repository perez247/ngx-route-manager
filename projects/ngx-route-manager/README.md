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

	singleUser: generateNgxRoute('users/:id'),

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
@Component({})

export class YourComponent {

routes = ngxRoutes;


getRoutes() {
	const homeRoute = routes.home.fn(); // outputs: ''

	const usersRoute = routes.users.fn(); // outputs: 'users'

	const singleUserRoute = routes.singleUser.fn({ id: '1234'}); // outputs: 'users/1234'

	const productCartRoute = routes.productCart.fn({ productId: '1234', cartId: 'abgh'}) // outputs: 'product/1234/cart/abgh'
}

  

getSnapshot() {
	const singleUserId = routes.singleUser.params.id.snapshotValue();

	const productId = routes.productCart.params.productId.snapshotValue();

	const cartId = routes.productCart.params.cartId.snapshotValue();
}

  

listenForValueChanges() {

	// listenForValue() returns an observable that checks for the change in value for the param in the url

	const singleUserIdSub = routes.singleUser.params.id.listenForValue().subscribe(...);

	const productIdSub = routes.productCart.params.productId.listenForValue().subscribe(...);

	const cartIdSub = routes.productCart.params.cartId.listenForValue().subscribe(...);

  

// Remember to destroy subscriptions

```

  Component.html
```

html file

<h2>Links</h2> -------------------------------------------------------------------

<-- / -->

<a [routerLink]="['/' + routes.home.fn()]">Home</a>

<-- /users -->

<a [routerLink]="['/' + routes.users.fn()]">User List</a>

<-- /users/1234 -->

<a [routerLink]="['/' + routes.singleUser.fn({ id: '1234' })]">Single user</a>

<-- /product/111/cart/abgh -->

<a [routerLink]="['/' + routes.productCart.fn({ productId: '1234', cartId: 'abgh' })]">Single user</a>

  

<h2>Snapshot</h2> -------------------------------------------------------------------

  

<p>Single User Id: {{ routes.singleUser.params.id.snapshotValue() }}</p>

<p>Product Id: {{ routes.productCart.params.productId.snapshotValue() }}</p>

<p>Cart Id: {{ routes.productCart.params.cartId.snapshotValue() }}</p>

  

<h2>Subscriptions</h2> -------------------------------------------------------------------

  

<p>Single User Id: {{ routes.singleUser.params.id.listenForValue() | async }}</p>

<p>Product Id: {{ routes.productCart.params.productId.listenForValue() | async }}</p>

<p>Cart Id: {{ routes.productCart.params.cartId.listenForValue() | async }}</p>

```

## Properties

### NgxRoute 
generateNgxRoute return a NgxRoute Object

|Name            |Description                    
|----------------|-------------------------------
|path: string            |The path used for setting the routes in app.routes/app-routing.module.ts            
|fn: (params< T >) => string | The function that enforces the right params in order to generate the right url string
|params: RouteParams       | Contains all the params (**NgxParam**) generated from the url string pattern passed
|segments:        | Contains the different none params of the url string pattern passed

### NgxParam
These are the types of object found in the RouteParams.

|Name            |Description                    
|----------------|-------------------------------
|snapshotValue: string            |Returns the current value of the param in the url if found (same as ActivatedRoute:snapshot)
|listenForValue: observable< string > | Returns an observable that listens for changes in the url, to get the param value (same as ActivatedRoute:paramMap)