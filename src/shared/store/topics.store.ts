import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Topic } from '../requests/response.interface';

interface TopicsState {
    topicsList: Topic[];
}
@Injectable({
    providedIn: 'root',
})
export class TopicsStore {
    private initialState: TopicsState = {
        topicsList: [
            {
                _id: { $oid: '' },
                created_by: '',
                name: '',
            },
        ],
    };

    // BehaviorSubject holds the current state
    private stateSubject = new BehaviorSubject<TopicsState>(this.initialState);

    // Observable for state consumers
    state$: Observable<TopicsState> = this.stateSubject.asObservable();

    // Getter for the current state
    get state(): TopicsState {
        return this.stateSubject.value;
    }

    // Method to update state
    updateState(partialState: Partial<TopicsState>) {
        const newState = { ...this.state, ...partialState };
        this.stateSubject.next(newState);
    }
}
