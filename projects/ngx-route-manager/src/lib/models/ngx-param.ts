import { ActivatedRoute } from "@angular/router";
import { filter, map, Observable, of } from "rxjs";
import { internalActivatedRoute } from "../services/ngx-route-manager.service";
import { computed } from "@angular/core";

export class NgxParam {

  route = internalActivatedRoute.route;
  /**
   * Name of the param
   */
  readonly name: string = '';

  /**
   * Returns the current snapshoot of the value in the url route
   */
  readonly snapshotValue = computed(() => {
    if (!internalActivatedRoute.route()) { return '' }
    else {
      return internalActivatedRoute.route()?.snapshot.paramMap.get(this.name) || ''
    }
  })

  /**
   * Listens for change on param in the route
   */
  readonly listenForValue = computed(() => {
    if (!internalActivatedRoute.route()) { return of('') }
    else {
      return internalActivatedRoute.route()?.paramMap
      .pipe(
        filter(paramMap => paramMap.has(this.name)),
        map(paramMap => paramMap.get(this.name) || '')
      )
    }
  })

  constructor(name: string) {
    this.name = name;
  }
}
