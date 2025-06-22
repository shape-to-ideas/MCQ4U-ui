import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserSessionData } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class UserStore {
    private initialState: UserSessionData = {
        email: '',
        expiry: 0,
        first_name: '',
        id: '',
        is_admin: false,
        last_name: '',
    };

    // BehaviorSubject holds the current state
    private stateSubject = new BehaviorSubject<UserSessionData>(
        this.initialState,
    );

    // Observable for state consumers
    state$: Observable<UserSessionData> = this.stateSubject.asObservable();

    // Getter for the current state
    get state(): UserSessionData {
        return this.stateSubject.value;
    }

    // Method to update state
    updateState(partialState: Partial<UserSessionData>) {
        const newState = { ...this.state, ...partialState };
        this.stateSubject.next(newState);
    }

    resetState(): void {
        this.stateSubject.next(this.initialState);
    }
}
