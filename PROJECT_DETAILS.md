# MCQ4U-UI — Project Summary

## What it is

MCQ4U-UI is the Angular frontend for **MCQ4U**, a multiple-choice-question practice platform. Users register/log in, browse topics, and either **create questions** (admins) or **attempt questions** for a topic and see their answers recorded. It's a client to a separate backend API (paths like `/api/v1/user/login`, `/api/v1/questions`, `/api/v1/topics`) — no backend code lives in this repo.

## Tech stack

- **Angular 18** (NgModules, not standalone components), TypeScript 5.5
- **PrimeNG 17** for UI components (dialogs, buttons, message/toast service) + **Tailwind CSS** for utility styling
- **RxJS** `BehaviorSubject`-based stores for app state (no NgRx)
- **axios** for HTTP calls (not Angular's `HttpClient`)
- **jwt-decode** to decode the JWT returned at login into session data
- Karma/Jasmine for unit tests (mostly default scaffolding, little real coverage)
- Deployed via Docker: multi-stage build (Node build → Nginx serving static files), see [Dockerfile](Dockerfile) and [nginx.conf](nginx.conf)

## Architecture / structure

```
src/app/
  app.module.ts, app-routing.module.ts   — root module & routes
  auth/            — login & register components (+ auth.module)
  dashboard/       — topic dashboard, and dashboard/questions/*
    questions/                — create-questions form (admin)
    questions/attempt-questions/ — attempt-a-topic's-questions flow
  header/, sidebar/ — shell chrome: topic list, nav, logout

src/shared/
  constants.ts        — route names, API paths enum, form field types, error messages
  interfaces.ts        — UserSessionData, Option types
  auth.guard.ts / admin-auth.guard.ts — route guards (both currently just check "is there a stored user")
  requests/
    requests.service.ts     — single service wrapping all axios calls + auth interceptors
    request.interface.ts / response.interface.ts — payload/response shapes
  store/
    user.store.ts        — current logged-in user (BehaviorSubject)
    topics.store.ts      — list of topics (BehaviorSubject)
  components/forms/     — generic dynamic form renderer driven by FormConfigTypes (used by login/register)
  utils/storage.ts       — localStorage read/write + JWT decoding helpers
```

## Key flows

1. **Auth**: `LoginComponent`/`RegisterComponent` render forms from a declarative `FormConfigTypes[]` config (shared `forms` component). On login, `RequestsService.userLogin` calls the API, stores the raw response in `localStorage` (`user` key), decodes the JWT into `UserSessionData`, and pushes it into `UserStore`. Axios request/response interceptors (registered in `RequestsService`'s constructor) attach the bearer token to every request and redirect to `/login` on a 401.
2. **Topics/Sidebar**: On login, `SidebarComponent` fetches all topics (`fetchTopicList`) and pushes them into `TopicsStore`; clicking a topic navigates to `/dashboard?topicId=...&topicName=...`.
3. **Dashboard**: Reads `topicId`/`topicName` from query params, fetches active questions for that topic, and offers "create question" / "attempt questions" actions gated by `isAdmin` (from `UserStore`).
4. **Create Questions** (`QuestionsComponent`): A `FormArray` of question groups (title + 4 options + correct answer + tags), submitted as a batch (`insertQuestions`) then redirects back to the dashboard.
5. **Attempt Questions** (`AttemptQuestionsComponent`): Loads a topic's questions plus the user's prior attempts, builds a `FormGroup` per question (pre-filled/disabled if already attempted), and submits selected answers via `attemptQuestions`.
6. **Route guards**: `AuthGuard`/`AdminAuthGuard` protect `dashboard`, `questions`, and `attempt-questions` routes — both currently just check whether *any* user is in storage (see Observations).

## Environments & deployment

- [src/environments/environment.ts](src/environments/environment.ts) / `environment.prod.ts` hold `apiUrl` for dev vs prod.
- Docker build compiles with `npm run build:prod` and serves the `dist/mcq4u-ui/browser` output via Nginx (`nginx.conf` handles Angular's client-side routing / listens on port 80).
- Recent commit history is dominated by deployment fixes (nginx hostname/port, prod `apiUrl`, questions-list API bug) — suggests the app is actively being stood up/deployed rather than mid-feature-development.

## Observations (not fixed, just noted)

- `AdminAuthGuard` is a near-duplicate of `AuthGuard` — it doesn't actually check `is_admin`, so it doesn't yet enforce admin-only access despite the name.
- `SharedService` ([src/shared/shared.service.ts](src/shared/shared.service.ts)) is an empty scaffolded class, seemingly unused.
- There are a few leftover debug artifacts: a `console.log('----user', user)` in [dashboard.component.ts](src/app/dashboard/dashboard.component.ts), a commented-out `TemplateRef`/`ViewContainerRef` block, and a `withTimeout` helper marked `// REMOVE`.
- Local dynamic form component in `shared/components/forms` is a reasonably general config-driven form builder (`FormConfigTypes`) shared by both login and register.
- Design mockups for the intended UI (login, register, topic home, add/view/attempt questions, results) are checked into [design/MCQ4U/](design/MCQ4U).
