import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, debounce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;
  private storageState$: BehaviorSubject<Map<string, string>>;

  constructor() {
    this.storage = window.localStorage;
    this.storageState$ = new BehaviorSubject(this.setLatestState());
  }

  public add(key: string, value: string): boolean {
    try {
      // check if key exist in storage
      if (this.get(key) != null) { return false }

      this.storage.setItem(key, value);

      // Update state
      this.storageState$.next(this.setLatestState())

      return true;
    } catch (error: any) {
      return false;
    }
  }

  public update(key: string, value: string): any {
    // check if key exist in storage
    if (this.get(key) == null) { return null }

    // if exists update
    this.storage.setItem(key, value);

    // Update state
    this.storageState$.next(this.setLatestState())

    return value;
  }

  public remove(key: any): any {
    // get the value to remove
    const valueToRemove = this.get(key);

    // check if key exist in storage
    if (valueToRemove == null) { return null }

    // remove the value from local storage
    this.storage.removeItem(key);

    // Update state
    this.storageState$.next(this.setLatestState())

    // return value
    return valueToRemove;

  }

  public list(): Observable<Map<string, string>> {
    return this.storageState$.asObservable();
  }

  public get(key: any): string {
    return this.storage.getItem(key) || '';
  }

  private setLatestState(): Map<string, string> {
    // extract the latest state from local storage
    const state = new Map<string, string>();
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key) {
        state.set(key, this.storage.getItem(key) || '');
      }
    }

    return state;
  }


}
