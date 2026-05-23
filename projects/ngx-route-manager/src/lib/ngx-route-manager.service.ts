import { Injectable, inject, computed } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { filter, map, startWith, Observable, switchMap, of, distinctUntilChanged } from 'rxjs';
import { NgxRoute } from './models/ngx-route';
import { NgxParam } from './models/ngx-param';
import { NgxQueryParam } from './models/ngx-query-params';

@Injectable({
  providedIn: 'root'
})
export class NgxRouteManagerService {
  private router = inject(Router);

  private navigationEnd = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null)
    )
  );

  private navigationEnd$ = toObservable(this.navigationEnd);

  private currentActivatedRoute = computed(() => {
    this.navigationEnd(); // dependency
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  });

  /**
   * Find the ActivatedRoute that matches the given NgxRoute pattern.
   * This traverses from the startRoute (or root) to find a match.
   */
  private findMatchingRoute(ngxRoute: NgxRoute<any, any>, startRoute?: ActivatedRoute): ActivatedRoute | null {
    const targetPath = ngxRoute.path;
    const root = startRoute || this.router.routerState.root;

    const find = (node: ActivatedRoute, accumulatedPath: string = ''): ActivatedRoute | null => {
        const configPath = node.snapshot.routeConfig?.path || '';
        let currentPath = accumulatedPath;
        if (configPath) {
            currentPath = accumulatedPath ? `${accumulatedPath}/${configPath}` : configPath;
        }

        const normalizedCurrent = currentPath.replace(/\/+/g, '/').replace(/^\//, '').replace(/\/$/, '');
        const normalizedTarget = targetPath.replace(/\/+/g, '/').replace(/^\//, '').replace(/\/$/, '');

        if (normalizedCurrent === normalizedTarget && configPath !== '') {
            return node;
        }
        for (const child of node.children) {
            const found = find(child, currentPath);
            if (found) return found;
        }
        return null;
    }

    return find(root);
  }

  getParamSnapshot(param: NgxParam, route?: ActivatedRoute): string {
    const ngxRoute = param._parent as NgxRoute<any, any>;
    if (!ngxRoute) return '';
    const targetRoute = this.findMatchingRoute(ngxRoute, route);
    return targetRoute?.snapshot.paramMap.get(param.name) || '';
  }

  getParamStream(param: NgxParam, route?: ActivatedRoute): Observable<string> {
    return this.navigationEnd$.pipe(
        switchMap(() => {
            const ngxRoute = param._parent as NgxRoute<any, any>;
            if (!ngxRoute) return of('');
            const targetRoute = this.findMatchingRoute(ngxRoute, route);
            if (!targetRoute) return of('');
            return targetRoute.paramMap.pipe(
                map(params => params.get(param.name) || ''),
                distinctUntilChanged()
            );
        })
    );
  }

  getQueryParamSnapshot(param: NgxQueryParam, route?: ActivatedRoute): string {
    // Traverse UP from current leaf or provided route to find the query param
    let current: ActivatedRoute | null = route || this.currentActivatedRoute();
    while (current) {
        if (current.snapshot.queryParamMap.has(param.name)) {
            return current.snapshot.queryParamMap.get(param.name) || '';
        }
        current = current.parent;
    }

    // Traverse DOWN from root to find ANY route that might have it (if not found in branch)
    const findDown = (node: ActivatedRoute): string | null => {
        if (node.snapshot.queryParamMap.has(param.name)) {
            return node.snapshot.queryParamMap.get(param.name);
        }
        for (const child of node.children) {
            const found = findDown(child);
            if (found !== null) return found;
        }
        return null;
    }

    return findDown(this.router.routerState.root) || '';
  }

  getQueryParamStream(param: NgxQueryParam, route?: ActivatedRoute): Observable<string> {
    return this.navigationEnd$.pipe(
        switchMap(() => {
            let current: ActivatedRoute | null = route || this.currentActivatedRoute();
            while (current) {
                if (current.snapshot.queryParamMap.has(param.name)) {
                    return current.queryParamMap.pipe(
                        map(params => params.get(param.name) || ''),
                        distinctUntilChanged()
                    );
                }
                current = current.parent;
            }

            // Fallback to searching the whole tree
            const root = this.router.routerState.root;
            const findRouteWithQueryParam = (node: ActivatedRoute): ActivatedRoute | null => {
                if (node.snapshot.queryParamMap.has(param.name)) return node;
                for (const child of node.children) {
                    const found = findRouteWithQueryParam(child);
                    if (found) return found;
                }
                return null;
            }

            const targetRoute = findRouteWithQueryParam(root);
            if (targetRoute) {
                return targetRoute.queryParamMap.pipe(
                    map(params => params.get(param.name) || ''),
                    distinctUntilChanged()
                );
            }

            return of('');
        })
    );
  }
}
