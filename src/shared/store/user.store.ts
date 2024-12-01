import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOCAL_STORAGE_KEYS, UserSessionData } from '../constants';
import { getStorageData } from '../utils/storage';

@Injectable({
    providedIn: 'root',
})
export class UserStore {
    private initialState: UserSessionData = {
        token: getStorageData(LOCAL_STORAGE_KEYS.USER),
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
}
