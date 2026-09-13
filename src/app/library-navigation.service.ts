import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryNavigationService {
  private _scrollToSearchTrigger = signal<number>(0);
  scrollToSearchTrigger = this._scrollToSearchTrigger.asReadonly();

  private _pendingScrollRequest = false;
  private libraryScrollCallback: (() => void) | null = null;

  registerLibraryScrollCallback(cb: () => void) {
    this.libraryScrollCallback = cb;
  }

  unregisterLibraryScrollCallback() {
    this.libraryScrollCallback = null;
  }

  requestScrollToSearch() {
    this._pendingScrollRequest = true;
  }

  triggerScrollToSearch() {
    if (this.libraryScrollCallback) {
      this.libraryScrollCallback();
    }
    this._scrollToSearchTrigger.update(val => val + 1);
  }

  consumeScrollRequest(): boolean {
    const pending = this._pendingScrollRequest;
    this._pendingScrollRequest = false;
    return pending;
  }
}
