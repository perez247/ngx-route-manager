import { filter, map, of } from "rxjs";
import { computed } from "@angular/core";
import { internalSignalRoute } from "../functions/listenForRouteChange";

export class NgxParam {

  /**
   * Name of the param
   */
  private readonly _name: string = '';
  public get name(): string {
    return this._name;
  }

  /**
   * Returns the current snapshoot of the value in the url route
   */
  readonly snapshotValue = computed(() => {
    if (!internalSignalRoute()) { return '' }
    else {
      return internalSignalRoute()?.snapshot.paramMap.get(this.name) || ''
    }
  })

  /**
   * Listens for change on param in the route
   */
  readonly listenForValue = computed(() => {
    if (!internalSignalRoute()) { 
      console.log(internalSignalRoute());
      return of('') 
    }
    else {
      return internalSignalRoute()?.paramMap
      .pipe(
        filter(paramMap => paramMap.has(this.name)),
        map(paramMap => paramMap.get(this.name) || '')
      )
    }
  })

  constructor(name: string) {
    this._name = name;
  }
}
