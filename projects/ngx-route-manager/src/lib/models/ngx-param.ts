import { ActivatedRoute } from "@angular/router";
import { filter, map, Observable, of } from "rxjs";

export class NgxParam {

  /**
   * Name of the param
   */
  readonly name: string = '';

  /**
   * Returns the current snapshoot of the value in the url route
   */
  readonly snapshotValue: () => string = () => ''

  /**
   * Listens for change on param in the route
   */
  readonly listenForValue: () => Observable<string> = () => of('');

  constructor(name: string, route?: ActivatedRoute) {
    this.name = name;

    if (route) {
      this.snapshotValue = () => route.snapshot.paramMap.get(this.name) || '';

      this.listenForValue = () => route.paramMap
                                  .pipe(
                                    filter(paramMap => paramMap.has(this.name)),
                                    map(paramMap => paramMap.get(this.name) || '')
                                  )
    }
  }
}
