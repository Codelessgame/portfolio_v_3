import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryNavigationService {
  private _scrollToSearchTrigger = signal<number>(0);
  scrollToSearchTrigger = this._scrollToSearchTrigger.asReadonly();

  private _pendingScrollRequest = false;

  requestScrollToSearch() {
    this._pendingScrollRequest = true;
  }

  triggerScrollToSearch() {
    this._scrollToSearchTrigger.update(val => val + 1);
  }

  consumeScrollRequest(): boolean {
    const pending = this._pendingScrollRequest;
    this._pendingScrollRequest = false;
    return pending;
  }
}
