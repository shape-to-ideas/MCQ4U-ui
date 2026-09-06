import { HeaderComponent } from './header.component';
import { UiStore } from '../../shared/store/ui.store';

function createComponent(uiStore: UiStore = new UiStore()) {
  const topicsStore: any = {};
  const router: any = {};
  const userStore: any = {};

  return new HeaderComponent(topicsStore, router, userStore, uiStore);
}

describe('HeaderComponent', () => {
  it('should create', () => {
    expect(createComponent()).toBeTruthy();
  });

  describe('toggleSidebar', () => {
    it('delegates to UiStore so the mobile drawer opens/closes', () => {
      const uiStore = new UiStore();
      const component = createComponent(uiStore);

      component.toggleSidebar();
      expect(uiStore.state).toBeTrue();

      component.toggleSidebar();
      expect(uiStore.state).toBeFalse();
    });
  });
});
