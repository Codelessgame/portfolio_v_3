import { Injectable, signal, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HomeNavigationService {
  private _pendingScrollRequest = false;
  private _lastKnownHomeScrollPosition: number | null = null;
  private landingScrollCallback: (() => void) | null = null;
  isLeavingHome = false;

  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          const currentUrl = this.router.url.split('?')[0].split('#')[0].replace(/\/$/, '');
          if (currentUrl === '' || currentUrl === '/') {
            this.isLeavingHome = true;
            const currentY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            this.setLastHomeScrollPosition(currentY);
          }
        } else if (event instanceof NavigationEnd) {
          const currentUrl = this.router.url.split('?')[0].split('#')[0].replace(/\/$/, '');
          if (currentUrl === '' || currentUrl === '/') {
            this.isLeavingHome = false;
          }
        }
      });
    }
  }

  registerHomeLandingCallback(cb: () => void) {
    this.landingScrollCallback = cb;
  }

  unregisterHomeLandingCallback() {
    this.landingScrollCallback = null;
  }

  triggerHomeClick() {
    if (this.landingScrollCallback) {
      this.landingScrollCallback();
    } else {
      this.requestScrollToLastPosition();
      this.router.navigate(['/']);
    }
  }

  setLastHomeScrollPosition(position: number) {
    this._lastKnownHomeScrollPosition = position;
    if (isPlatformBrowser(this.platformId)) {
      try {
        if (position > 0) {
          sessionStorage.setItem('portfolio_home_scroll', position.toString());
        } else {
          sessionStorage.removeItem('portfolio_home_scroll');
        }
      } catch (_) {}
    }
  }

  getLastHomeScrollPosition(): number | null {
    if (this._lastKnownHomeScrollPosition !== null) {
      return this._lastKnownHomeScrollPosition;
    }
    if (isPlatformBrowser(this.platformId)) {
      try {
        const stored = sessionStorage.getItem('portfolio_home_scroll');
        if (stored !== null) {
          const parsed = parseFloat(stored);
          if (!isNaN(parsed)) {
            this._lastKnownHomeScrollPosition = parsed;
            return parsed;
          }
        }
      } catch (_) {}
    }
    return null;
  }

  resetPosition() {
    this._lastKnownHomeScrollPosition = 0;
    if (isPlatformBrowser(this.platformId)) {
      try {
        sessionStorage.removeItem('portfolio_home_scroll');
      } catch (_) {}
    }
  }

  requestScrollToLastPosition() {
    this._pendingScrollRequest = true;
  }

  triggerScrollToLanding() {
    this.triggerHomeClick();
  }

  consumeScrollRequest(): boolean {
    const pending = this._pendingScrollRequest;
    this._pendingScrollRequest = false;
    return pending;
  }
}
