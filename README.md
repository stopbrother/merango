# MeranGo - 메이플랜드 파티 매칭 서비스

메이플랜드(MapleStory Worlds)의 유저들이 **파티 구인/구직을 쉽게 할 수 있도록 도와주는 파티 매칭 서비스**입니다.  
Discord 소셜 로그인을 통해 간편하게 접속하고, 프로필을 설정한 뒤 구인글을 등록하거나 원하는 파티를 찾아 참가 신청할 수 있습니다.

---

## 🔗 링크

- **서비스 주소**: https://[배포 도메인].party
- **Dev / Preview**: https://[dev 도메인].vercel.app
- **GitHub Repository**: https://github.com/[username]/[repo-name]

> ※ 실제 사용하는 도메인/레포 주소로 교체해주세요.

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

- **프로필 페이지**에서 정보를 확인할 수 있습니다.
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
- 동의/약관/개인정보처리방침 페이지 및 법적 문서 기본 템플릿 구현

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
- 상호작용이 필요한 부분은 `클라이언트 컴포넌트`로 분리
- 헤더를 `서버 컴포넌트`로 구현
  - 내부에서 supabase 서버 클라이언트 생성 후 세션을 조회
  - 로그인하지 않은 경우 → `로그인버튼` 렌더
  - 로그인한 경우 → `유저 메뉴` 렌더
- 요청이 들어오면 서버에서 먼저 페이지를 렌더링하기 때문에
  - 초기 로딩시점부터 `사용자 상태가 반영된 UI`를 보여줄 수 있음
  - 파티목록 같은 주요 페이지에서 `SEO`에도 유리해짐

### 2. Supabase 기반 BaaS

- 별도의 백엔드 서버 없이 **Supabase를 사용해 인증, DB를 통합 관리**
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

### 4. 유저 플로우 설계

### 5. 파티 데이터 비즈니스 규칙

### 6. UI구조

### 1. SSR + Supabase Auth

- Next.js App Router의 **Server Component**에서 Supabase 클라이언트를 생성하여  
  로그인 유저 정보를 가져와 SSR 단계에서 헤더/페이지 상태를 결정
- AuthHeader를 서버 컴포넌트로 변경하여, **초기 렌더링 시점부터 로그인 상태 반영**

### 2. TanStack Query로 서버 상태 관리

- 로그인 상태, 프로필, 파티 목록 등 **서버 상태를 TanStack Query로 관리**
- 페이지는 기본적으로 SSR로 렌더링하고, **클라이언트에서는 캐시 기반으로 부드럽게 갱신**
- React Query Devtools를 개발 환경에서만 노출하도록 설정

### 3. dev/prod 환경 분리

- Supabase 프로젝트를 **dev / prod로 분리**
- Vercel 환경별로 **서로 다른 Supabase URL / 키** 사용
- `.env.local`, Vercel 환경 변수 등을 통해 환경별 설정 분리

### 4. 동의(Consent) 설계

- `CONSENT_VERSION` 상수를 두고, 버전이 올라가면 재동의 유도 가능하도록 설계
- profiles 테이블 예시:

  - `terms_accepted_at`, `terms_version`
  - `privacy_accepted_at`, `privacy_version`
  - `is_over_14` (또는 유사 컬럼)

---

## 📁 폴더 구조

> 실제 구조에 맞게 수정해서 사용하세요.

```bash
app/
  layout.tsx
  page.tsx                # 홈
  auth/
    callback/route.ts     # Discord OAuth 콜백
  consent/
    page.tsx              # 약관/동의 페이지
  recruit/
    page.tsx              # 파티 리스트/검색 페이지
    [id]/
      page.tsx            # 파티 상세 페이지
  settings/
    page.tsx              # 프로필/계정 설정

components/
  common/
  recruit/
  profile/
  auth/

lib/
  supabase/
    server.ts             # createClient 등
  constants/
    consent.ts            # CONSENT_VERSION 등

types/
  supabase.ts             # supabase gen types
```

---

## ⚙️ 로컬 실행 방법

1. 저장소 클론

```bash
git clone https://github.com/[username]/[repo-name].git
cd [repo-name]
```

2. 패키지 설치

```bash
pnpm install
```

3. 환경 변수 설정
   프로젝트 루트에 .env.local 파일을 생성하고, 아래와 같이 설정합니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
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

Supabase RLS 적용 및 dev/prod 환경 분리 경험

[TODO] 블로그 또는 노션 링크를 추가해주세요.

## 📌 향후 개선 계획 (TODO)

## 🙋‍♂️ 개발자

이름: [본인 이름 or 닉네임]

GitHub: https://github.com/[username
]

이메일: [선택 사항]
