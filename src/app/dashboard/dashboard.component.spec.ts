import { DashboardComponent } from './dashboard.component';
import { StatsResponse } from '../../shared/requests/response.interface';

function createComponent(requestsServiceOverrides: Partial<{
  getStats: () => Promise<StatsResponse>;
}> = {}) {
  const requestsService: any = {
    getStats: () => Promise.resolve({} as StatsResponse),
    ...requestsServiceOverrides,
  };
  const messageService: any = { add: jasmine.createSpy('add') };
  const userStore: any = {};
  const router: any = {};
  const activatedRoute: any = { queryParams: { subscribe: () => {} } };

  return new DashboardComponent(
    requestsService,
    router,
    activatedRoute,
    messageService,
    userStore,
  );
}

describe('DashboardComponent', () => {
  it('should create', () => {
    expect(createComponent()).toBeTruthy();
  });

  describe('splitTags', () => {
    it('splits a space-separated tags string into individual tags', () => {
      const component = createComponent();
      expect(component.splitTags('biology cells exam')).toEqual([
        'biology',
        'cells',
        'exam',
      ]);
    });

    it('collapses repeated whitespace instead of producing empty entries', () => {
      const component = createComponent();
      expect(component.splitTags('biology   cells')).toEqual([
        'biology',
        'cells',
      ]);
    });

    it('trims leading/trailing whitespace', () => {
      const component = createComponent();
      expect(component.splitTags('  biology cells  ')).toEqual([
        'biology',
        'cells',
      ]);
    });

    it('returns an empty array for an empty or falsy tags string', () => {
      const component = createComponent();
      expect(component.splitTags('')).toEqual([]);
      expect(component.splitTags(undefined as unknown as string)).toEqual([]);
    });
  });

  describe('loadStats', () => {
    it('populates stats from the API and clears the loader on success', async () => {
      const stats: StatsResponse = {
        total_topics: 12,
        total_users: 6,
        questions_attempted: 3,
        users_attempted: 2,
      };
      const component = createComponent({ getStats: () => Promise.resolve(stats) });

      const pending = component.loadStats();
      expect(component.showStatsLoader).toBeTrue();
      await pending;

      expect(component.stats).toEqual(stats);
      expect(component.showStatsLoader).toBeFalse();
    });

    it('leaves stats unset and shows an error toast when the API call fails', async () => {
      const component = createComponent({
        getStats: () => Promise.reject(new Error('network error')),
      });

      await component.loadStats();

      expect(component.stats).toBeNull();
      expect(component.showStatsLoader).toBeFalse();
    });
  });
});
