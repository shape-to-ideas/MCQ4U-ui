import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Topic } from '../requests/response.interface';

@Injectable({
    providedIn: 'root',
})
export class TopicsStore {
    private initialState: Topic[] = [
        {
            _id: { $oid: '' },
            created_by: '',
            name: '',
        },
    ];

    // BehaviorSubject holds the current state
    private stateSubject = new BehaviorSubject<Topic[]>(this.initialState);

    // Observable for state consumers
    state$: Observable<Topic[]> = this.stateSubject.asObservable();

    // Getter for the current state
    get state(): Topic[] {
        return this.stateSubject.value;
    }

    // Method to update state
    updateState(partialState: Topic[]) {
        const newState = [...this.state, ...partialState];
        this.stateSubject.next(newState);
    }

    resetState(): void {
        this.stateSubject.next(this.initialState);
    }
}
