import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";
import { signal } from "@angular/core";

export const internalSignalRoute = signal<ActivatedRoute | undefined>(undefined);

// Factory function to initialize the service
export function listenForRouteChange(router: Router, route: ActivatedRoute) {
  return () => {
        internalSignalRoute.set(route);
        const subscription = router.events.pipe(
          filter(event => event instanceof NavigationEnd),
        ).subscribe(() => {
          // Traverse to the most deeply activated route
          let route = router.routerState.root;
          while (route.firstChild) {
            route = route.firstChild;
          }
          internalSignalRoute.set(route);
        });

        return () => subscription.unsubscribe();
  };
}