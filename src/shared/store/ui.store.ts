import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UiStore {
    private initialState = false;

    private stateSubject = new BehaviorSubject<boolean>(this.initialState);

    state$: Observable<boolean> = this.stateSubject.asObservable();

    get state(): boolean {
        return this.stateSubject.value;
    }

    toggleSidebar(): void {
        this.stateSubject.next(!this.state);
    }

    closeSidebar(): void {
        this.stateSubject.next(false);
    }
}
