import { of } from 'rxjs';
import { SidebarComponent } from './sidebar.component';
import { UiStore } from '../../shared/store/ui.store';

function createComponent(uiStore: UiStore = new UiStore()) {
  const topicsStore: any = { state$: of([]) };
  const requestsService: any = {};
  const router: any = { navigate: jasmine.createSpy('navigate') };
  const userStore: any = { state$: of({}) };
  const messageService: any = {};

  const component = new SidebarComponent(
    topicsStore,
    requestsService,
    router,
    userStore,
    messageService,
    uiStore,
  );
  return { component, router, uiStore };
}

describe('SidebarComponent', () => {
  it('should create', () => {
    expect(createComponent().component).toBeTruthy();
  });

  describe('mobile drawer state', () => {
    it('reflects UiStore state once subscribed via ngOnInit', () => {
      const { component, uiStore } = createComponent();
      component.ngOnInit();

      expect(component.isMobileSidebarOpen).toBeFalse();

      uiStore.toggleSidebar();
      expect(component.isMobileSidebarOpen).toBeTrue();
    });

    it('closeMobileSidebar closes the drawer via UiStore', () => {
      const { component, uiStore } = createComponent();
      component.ngOnInit();
      uiStore.toggleSidebar();
      expect(component.isMobileSidebarOpen).toBeTrue();

      component.closeMobileSidebar();

      expect(component.isMobileSidebarOpen).toBeFalse();
    });
  });

  describe('redirectToTopic', () => {
    it('navigates to the dashboard with the topic query params', () => {
      const { component, router } = createComponent();

      component.redirectToTopic('topic-1', 'Anatomy');

      expect(router.navigate).toHaveBeenCalledWith(['dashboard'], {
        queryParams: { topicId: 'topic-1', topicName: 'Anatomy' },
      });
    });

    it('closes the mobile drawer so selecting a topic does not leave it open', () => {
      const { component, uiStore } = createComponent();
      component.ngOnInit();
      uiStore.toggleSidebar();
      expect(component.isMobileSidebarOpen).toBeTrue();

      component.redirectToTopic('topic-1', 'Anatomy');

      expect(component.isMobileSidebarOpen).toBeFalse();
    });
  });
});
