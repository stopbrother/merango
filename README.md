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

### 1. 인증 & 동의 플로우

- Discord 소셜 로그인 (Supabase Auth)
- **최초 로그인 시 동의 페이지로 이동**
  - 이용약관 / 개인정보처리방침 / 만 14세 이상 여부 체크
  - `CONSENT_VERSION`을 활용한 동의 버전 관리
  - 동의 일시(`*_accepted_at`)와 버전(`*_version`)을 profiles 테이블에 저장
- 동의하지 않으면 서비스 주요 기능 접근 불가 (가드 처리)

### 2. 프로필 관리

- 필수 정보: 닉네임, 레벨, 직업 등
- 선택 정보: 자기소개, 소셜명 등
- 프로필 미완성 시:
  - 구인하기/참가하기 버튼 클릭 시 토스트/다이얼로그로 안내

### 3. 파티 구인/구직

- 파티 구인글 목록 조회
- 필터/검색 기능
  - 파티 유형, 키워드 등으로 검색
- 구인글 상세 보기
- 파티 참가 신청 기능 (선착순/조건부 등 [구현 상태에 맞게 수정])

### 4. 서비스 운영 측면 기능

- **SSR 기반 페이지 렌더링** (Next.js App Router)
- 메타데이터, OG 이미지, `robots`, `sitemap` 등을 활용한 **SEO 대응**
- Supabase dev/prod 프로젝트 분리 및 Vercel 환경 분리
- 동의/약관/개인정보처리방침 페이지 및 법적 문서 기본 템플릿 구현

---

## 🧩 기술 스택

### Frontend

- **Next.js 14 (App Router)**
- **TypeScript**
- **React**
- **shadcn/ui**
- **Tailwind CSS**
- **TanStack Query (React Query)**

### Backend / Infra

- **Supabase**
  - Postgres Database
  - Auth (Discord 소셜 로그인)
  - Row Level Security(RLS)
- **Vercel**
  - Production / Preview / Dev 환경 분리 배포

---

## 🏗️ 아키텍처 & 설계 포인트

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
