import { QuestionsComponent } from './questions.component';

function createComponent() {
  const activatedRoute: any = { queryParams: { subscribe: () => {} } };
  const router: any = {};
  const messageService: any = { add: jasmine.createSpy('add') };
  const requestService: any = { insertQuestions: () => Promise.resolve() };

  const component = new QuestionsComponent(
    activatedRoute,
    router,
    messageService,
    requestService,
  );
  component.topicId = 'topic-1';
  return component;
}

describe('QuestionsComponent', () => {
  it('should create', () => {
    expect(createComponent()).toBeTruthy();
  });

  describe('tags handling', () => {
    it('defaults the tags control to an empty array for the initial question', () => {
      const component = createComponent();
      expect(component.question.at(0).get('tags')?.value).toEqual([]);
    });

    it('defaults the tags control to an empty array for questions added via addQuestion()', () => {
      const component = createComponent();
      component.addQuestion();
      expect(component.question.at(1).get('tags')?.value).toEqual([]);
    });
  });

  describe('mapQuestionsFormPayload', () => {
    it('joins pill tags back into the space-separated string the API expects', () => {
      const component = createComponent();
      const payload = component.mapQuestionsFormPayload({
        title: 'Title',
        optionA: 'A',
        optionB: 'B',
        optionC: 'C',
        optionD: 'D',
        correctAnswer: 'A',
        tags: ['biology', 'cells', 'exam'],
      });

      expect(payload.tags).toBe('biology cells exam');
    });

    it('produces an empty string when there are no tags', () => {
      const component = createComponent();
      const payload = component.mapQuestionsFormPayload({
        title: 'Title',
        optionA: 'A',
        optionB: 'B',
        optionC: 'C',
        optionD: 'D',
        correctAnswer: 'A',
        tags: [],
      });

      expect(payload.tags).toBe('');
    });

    it('trims the title and carries the topic id and answer through', () => {
      const component = createComponent();
      const payload = component.mapQuestionsFormPayload({
        title: '  What is X?  ',
        optionA: 'A',
        optionB: 'B',
        optionC: 'C',
        optionD: 'D',
        correctAnswer: 'C',
        tags: [],
      });

      expect(payload.title).toBe('What is X?');
      expect(payload.topic_id).toBe('topic-1');
      expect(payload.answer).toBe('C');
      expect(payload.is_active).toBeTrue();
      expect(payload.options).toEqual([
        { key: 'A', title: 'A' },
        { key: 'B', title: 'B' },
        { key: 'C', title: 'C' },
        { key: 'D', title: 'D' },
      ]);
    });
  });
});
