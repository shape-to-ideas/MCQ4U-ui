import { UiStore } from './ui.store';

describe('UiStore', () => {
  let store: UiStore;

  beforeEach(() => {
    store = new UiStore();
  });

  it('starts closed', () => {
    expect(store.state).toBeFalse();
  });

  it('toggleSidebar flips the current state', () => {
    store.toggleSidebar();
    expect(store.state).toBeTrue();

    store.toggleSidebar();
    expect(store.state).toBeFalse();
  });

  it('closeSidebar sets state to false regardless of current state', () => {
    store.toggleSidebar();
    expect(store.state).toBeTrue();

    store.closeSidebar();
    expect(store.state).toBeFalse();

    store.closeSidebar();
    expect(store.state).toBeFalse();
  });

  it('emits every state change on state$', () => {
    const emissions: boolean[] = [];
    store.state$.subscribe((value) => emissions.push(value));

    store.toggleSidebar();
    store.closeSidebar();

    expect(emissions).toEqual([false, true, false]);
  });
});
