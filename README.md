# MeranGo - 메이플랜드 파티 매칭 서비스

메이플랜드(MapleStory Worlds)의 유저들이 **파티 구인/구직을 쉽게 할 수 있도록 도와주는 파티 매칭 서비스**입니다.  
Discord 소셜 로그인을 통해 간편하게 접속하고, 프로필을 설정한 뒤 구인글을 등록하거나 원하는 파티를 찾아 참가 신청할 수 있습니다.

---

## 🔗 링크

- **서비스 주소**: https://merango.party
- **Dev / Preview**: https://merango.vercel.app
- **GitHub Repository**: https://github.com/stopbrother/merango

---

## 🎯 프로젝트 목표

- 단순 토이 프로젝트가 아닌, **실제 서비스로 바로 사용 가능한 수준**의 웹 애플리케이션 구현
- 로그인, 약관 동의, 프로필 설정, 파티 구인/구직, SEO, 배포 환경 분리까지  
  **서비스 운영에 필요한 전 과정을 경험**하는 것이 목표

---

## ✨ 주요 기능

### 1. 소셜 로그인 & 동의 플로우

- Supabase OAuth를 이용한 **Discord 소셜 로그인**
- 최초 로그인 시 **동의 페이지**로 이동
  - 이용약관 / 개인정보처리방침 / 만 14세 이상 여부 체크
- 동의하지 않으면 서비스 이용 불가 (가드 처리)
- 동의 완료후 프로필 편집 페이지로 이동 (게임 내 닉네임/레벨/직업 작성 유도)

### 2. 파티 구인글 관리 (작성 / 수정 / 삭제 / 끌어올리기)

- 사냥 / 퀘스트 / 보스 파티 타입과 제목,설명을 입력해 **파티 구인글 등록**
- **계정당 최대 5개의 구인글 작성 제한**
- 본인이 작성한 글은 **수정, 삭제, 끌어올리기** 가능
- **끌어올리기**는 **30분에 한번** 목록 상단으로 올릴 수 있음

### 3. 파티 찾기 & 검색

- 목록에서 필터로 **전체 / 사냥 / 퀘스트 / 보스** 타입을 나누어 볼 수 있음
- **타입 필터 + 키워드 검색**을 조합하여 원하는 파티를 조회
- 목록은 `생성 시각`과 `끌어올린 시각`을 합친 **정렬 기준**으로 조회

### 4. 파티 상세보기

- 파티 카드를 클릭하여 **모달 형태**의 상세 정보 확인
- **파티 설명**과 **참가자 목록**을 확인할 수 있음
- 상세보기에서 선착순으로 **파티 참가 신청**이 가능 (작성자 포함 6명까지 참여)

### 5. 프로필 관리

- **프로필 페이지**에서 다음 정보를 확인 및 관리
  - 닉네임/레벨/직업
  - 소개글
  - 참가중인 파티 목록
  - 생성한 파티 목록
- 프로필 정보가 **미완성**인 상태에서는 **구인글 작성 및 참가 불가능**
  - 필수 정보: 닉네임, 레벨, 직업
  - 선택 정보: 소셜명
- 프로필 미완성 시:
  - 구인하기/참가하기 버튼 클릭 시 **토스트/다이얼로그로 안내**

### 4. 서비스 운영 측면 기능

- **SSR 기반 페이지 렌더링** (Next.js App Router)
- 메타데이터, OG 이미지, `robots`, `sitemap` 등을 활용한 **SEO 대응**
- Supabase dev/prod 프로젝트 분리 및 Vercel 환경 분리
- 동의/약관/개인정보처리방침 페이지 및 기본 법적 문서 템플릿 구현

---

## 🧩 기술 스택

### Framework & Language

- **Next.js 14**(App Router)
- **React 18**
- **TypeScript 5**

### Backend & Infra

- **Supabase**(PostgreSQL, OAuth)
- **Vercel** (배포 및 호스팅)

### **데이터 & 폼 상태 관리**

- **TanStack query v5** - 서버 상태 관리
- **React Hook Form + Zod** - 폼 상태 관리 및 검증

### UI

- **Tailwind CSS v4**
- **shadcn/ui**
- 아이콘: **lucide-react, react-icons**

### 기타

- 날짜: **date-fns**
- 스크롤 감지: **react-intersection-observer**

---

## 🏗️ 아키텍처 & 설계 포인트

### 1. Next.js App Router 기반 SSR

- **Next.js App Router**를 사용해 페이지를 구성하고 `app` 폴더 아래의 `page.tsx`는 기본적으로 **서버 컴포넌트**로 구현
- `app` 폴더 아래의 `page.tsx`는 서버 컴포넌트
- 상호작용이 필요한 부분은 **클라이언트 컴포넌트**로 분리
- 헤더를 **서버 컴포넌트**로 구현
  - 내부에서 supabase 서버 클라이언트 생성해 세션을 조회
  - 로그인하지 않은 경우 → `로그인버튼` 렌더
  - 로그인한 경우 → `유저 메뉴` 렌더
- 요청이 들어오면 서버에서 먼저 페이지를 렌더링하기 때문에
  - 초기 로딩시점부터 **사용자 상태가 반영된 UI**를 보여줄 수 있음
  - 파티목록 같은 주요 페이지에서 **SEO에도 유리**

### 2. Supabase 기반 BaaS

- 별도의 백엔드 서버 없이 **Supabase를 사용해 인증과 DB를 통합 관리**
- Supabase Auth의 `OAuth`를 사용하여 디스코드 소셜로그인 구현
  - `/auth/callback` 서버 라우트에서 Supabase 서버 클라이언트를 생성해 인증코드를 Supabase로 전달하고 세션을 생성
- Supabase 클라이언트는 `utils/supabase/server.ts, client.ts`경로에 분리하여 서버/클라이언트 환경에 따라 재사용
- `RLS 정책`을 통해 작성자 본인만 수정/삭제
- 테이블의 CRUD 작업은 **Supabase 쿼리**로 처리
- `profiles`테이블 구조는 **Supabase Quickstarts의 User Management Starter**를 기반(`auth.users`에 유저가 추가되면 `profiles` 테이블에도 자동으로 동기화)
- 테이블 구성
  - `profiles`
    - 사용자 프로필 정보 및 동의 관련
  - `party_recruit`
    - 파티 구인글 정보
  - `party_member`
    - 파티 참가자

### 3. 데이터 & 폼 상태 관리

- **서버 상태 관리 - TanStack query**

  - 파티목록, 참가/취소, 프로필 정보 등 서버에서 가져오는 데이터는 **TanStack Query**로 관리
  - 서버와 연동되는 액션은 **Query/Mutation + 캐시**를 통해 처리,
    mutation 성공 시 캐시 무효화해서 최신 데이터 갱신
  - 페이지 컴포넌트에서 `prefetchQuery`로 데이터를 미리 조회하여 클라이언트에서 `HydrationBoundary`를 통해 해당 캐시를 사용

- **폼 상태 & 검증 - React Hook Form + Zod**

  - **React Hook Form**으로 폼 상태 관리
  - `@hookform/resolvers` 패키지의 `zodResolver`로 **Zod 스키마**와 **React Hook Form**을 연결하여
    타입 기반의 유효성 검사와 에러 메시지를 관리
  - 에러 메시지는 `shadcn/ui`의 Form 컴포넌트를 통해 UI 구성

- **실시간(Supabase Realtime)**

  Supabase Realtime을 구독하여 데이터 변경시 다른 사용자 화면에서도 반영

  - 파티 테이블(`party_recruit`)의 **INSERT 이벤트**를 구독
    - 새로운 파티글이 등록되면 상단에 "새 글 알림" 버튼과 카운트 노출
    - 버튼 클릭시 관련 목록 쿼리 캐시를 무효화하고 다시 조회
  - 파티 참가자 테이블(`party_member`)은 **모든 이벤트(INSERT/UPDATE/DELETE)**를 구독
    - 참가 / 취소 등으로 데이터가 변경되면 관련 캐시를 무효화하고 다시 조회

### 4. 유저 플로우 설계

1. Discord 소셜 로그인(Supabase OAuth)
2. 최초 로그인시 동의 페이지(`/consent`) 이동
3. 만 14세 이상 / 이용약관 / 개인정보처리방침 모두 동의
4. 프로필 편집 페이지로 이동하여 닉네임/레벨/직업 입력 유도
5. 파티 구인/참가 기능 사용

- **로그인 / 동의 가드**

  - `middleware`에서 Supabase 세션과 동의 여부 확인
  - 세션이 없는 경우 보호된 페이지 접근시 로그인 안내페이지로 이동
  - 동의를 완료하지 않은 경우 동의페이지로 이동

- **프로필 미완성 가드**
  - 프로필 정보 (닉네임, 레벨, 직업)가 미완성인 상태에서 **파티 구인/구직 기능 사용불가**
  - 구인/참가하기 버튼 클릭시 토스트 및 다이얼로그로 프로필 작성 안내 및 유도
- 페이지 전체 접근을 막지 않고 **액션 시점에서 프로필 작성 유도**

### 5. 파티 데이터 비즈니스 규칙

- **파티 구인글 작성 제한**

  - 한 계정당 **최대 5개의 파티 구인글 작성** 가능

- **파티 참가 인원 제한**

  - 각 파티는 작성자 포함 **최대 6명까지 참가** 가능
  - 같은 파티에 **중복 참가** 불가

- **정렬 기준 & 끌어올리기**

  - `sort_time = COALESCE(raised_date_time, created_date_time)` 컬럼으로 정렬

    - 끌어올린 시점 (`raised_date_time`)
    - 최초 작성 시점(`created_date_time`)
    - 하나의 정렬 기준으로 통합하여 `sort_time`기준 내림차순으로 정렬

  - 끌어올리기 기능은 파티 구인글당 **30분에 한 번** 사용, `raised_date_time` 갱신하여 목록 상단으로 노출

- **버튼 상태**
  - 참가상태, 참가 인원수, 본인 작성 여부에 따른 버튼 분기
    - 참가 버튼 활성화 / 참가 취소 활성화
    - 본인이 작성한 글인 경우 **수정/삭제/끌어올리기** 버튼 노출

### 6. UI구조

- **레이아웃 & 라우트 그룹**

  - **전역 레이아웃**(app/layout.tsx)
    - 메타데이터, TanStack Query Provider, 토스트 등을 설정
  - Route Group으로 **헤더·푸터 유무에 따라 페이지 분리**
    - `(plain)/consent`: 동의페이지 - 헤더·푸터가 없는 레이아웃
    - `(site)`: 나머지 페이지 - 헤더·푸터가 포함된 레이아웃
  - 헤더를 **서버 컴포넌트**로 구현
    - `Supabase 세션`을 읽어와 로그인 상태에 따라 `로그인 버튼` 또는 `유저 메뉴` 렌더

- **파티 목록 & 상세보기**

  - 파티 목록은 **카드 리스트**로 구성
    - shadcn/ui의 `Card` 컴포넌트 사용
  - 카드 클릭시 **모달 형태의 상세보기**

    - shadcn/ui의 `Dialog` 컴포넌트 사용

  - **무한스크롤 목록**

    - 파티 목록은 **무한 스크롤 방식**으로 구현
    - TanStack Query의 `useInfiniteQuery`로 커서 기반으로 15개씩 데이터를 가져와 렌더
    - `react-intersection-observer`로 리스트 하단에 둔 sentinel 요소가 뷰포트에 들어오면 다음 데이터 패칭

- **폼**

  - 파티 작성, 프로필 편집, 검색 폼 등은 shadcn/ui의 `Form` 컴포넌트 및 `Input`, `Textarea`, `RadioGroup`, `Select` 등을 조합
  - `React Hook Form + Zod` 검증하여 라벨, 입력 필드, 에러 메시지를 일관된 레이아웃으로 구성

---

## 📁 폴더 구조

```bash
📦src
 ┣ 📂api                  # Supabase 기반 API 함수들
 ┃ ┣ 📜auth-api.ts
 ┃ ┣ 📜member-api.ts
 ┃ ┣ 📜party-api.ts
 ┃ ┗ 📜profile-api.ts
 ┣ 📂app
 ┃ ┣ 📂(plain)            # 헤더·푸터 없는 동의 페이지
 ┃ ┣ 📂(site)             # 그외 페이지들
 ┃ ┣ 📂fonts              # 폰트
 ┃ ┣ 📜error.tsx          # 전역 에러 페이지
 ┃ ┣ 📜globals.css        # 전역 스타일 및 Tailwind CSS 설정
 ┃ ┣ 📜layout.tsx         # 전역 레이아웃
 ┃ ┣ 📜not-found.tsx      # 404 페이지
 ┃ ┣ 📜providers.tsx      # TanStack Query provider
 ┃ ┣ 📜robots.ts
 ┃ ┗ 📜sitemap.ts
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┣ 📂common
 ┃ ┣ 📂consent
 ┃ ┣ 📂docs
 ┃ ┣ 📂layout
 ┃ ┣ 📂profile
 ┃ ┣ 📂recruit
 ┃ ┣ 📂settings
 ┃ ┗ 📂ui                 # shadcn/ui UI
 ┣ 📂constants            # 상수들
 ┃ ┣ 📜consent.ts
 ┃ ┣ 📜error-message.ts
 ┃ ┣ 📜messages.ts
 ┃ ┗ 📜partyType.ts
 ┣ 📂hooks
 ┃ ┣ 📂query              # TanStack Query 관련 훅
 ┃ ┗ 📂realtime           # Supabase Realtime 훅
 ┣ 📂lib
 ┃ ┗ 📜utils.ts
 ┣ 📂types
 ┣ 📂utils
 ┃ ┣ 📂supabase           # Supabase Client 및 미들웨어
 ┃ ┃ ┣ 📜admin.ts
 ┃ ┃ ┣ 📜client.ts
 ┃ ┃ ┣ 📜middleware.ts    # Supabase 세션 동기화 + 로그인/동의 가드
 ┃ ┃ ┗ 📜server.ts
 ┃ ┣ 📜auth.ts
 ┃ ┗ 📜time.ts
 ┗ 📜middleware.ts        # Next.js 미들웨어
```

---

## ⚙️ 로컬 실행 방법

1. 저장소 클론

```bash
git clone https://github.com/stopbrother/merango.git
cd merango
```

2. 패키지 설치

```bash
pnpm install
```

3. 환경 변수 설정
   프로젝트 루트에 `.env.local` 파일을 생성하고, Supabase 정보 설정.

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. 개발 서버 실행

```bash
pnpm dev
```

## 🧪 트러블슈팅 & 기술 노트

아래와 같은 주제들에 대해 별도의 블로그/문서로 정리하고, 링크를 추가할 예정입니다.

Discord 소셜 로그인 후 닉네임(global_name)이 갱신되지 않는 문제 해결

/auth/callback에서 provider_token으로 Discord API 호출 후 profiles 업데이트 흐름

CONSENT_VERSION 기반 동의 플로우 설계

Supabase RLS 적용 및 dev/prod 환경 분리 경험 등등

[TODO] 링크 추가.

## 📌 향후 개선 계획 (TODO)

- 파티참가 선착순 → 파티장이 승인하는 시스템
- 알림: 파티참가 신청시 파티장에게 알림 & 참가 승인/거절
- 파티 모집글 공개/비공개
- 프로필 이미지 편집
- 관심 구인글
- 다크모드
- 채팅
