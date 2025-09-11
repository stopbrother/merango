const page = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">개인정보처리방침</h1>

      <section>
        <h2 className="text-lg font-medium mb-2">1. 수집하는 개인정보 항목</h2>
        <p>
          서비스는 회원 가입 및 이용 과정에서 다음과 같은 개인정보를 수집합니다.
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>필수: 소셜 로그인 계정 ID, 닉네임, 프로필 이미지</li>
          <li>선택: 프로필 소개글</li>
          <li>자동 수집: 접속 로그, 쿠키, IP 주소</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">
          2. 개인정보의 수집 및 이용 목적
        </h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>회원 식별 및 본인 확인</li>
          <li>파티 모집/참여 기능 제공</li>
          <li>서비스 품질 개선 및 오류 대응</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">
          3. 개인정보의 보유 및 이용 기간
        </h2>
        <p>
          원칙적으로 회원 탈퇴 시 개인정보를 즉시 파기합니다. 다만 법령에서 정한
          경우 일정 기간 보관할 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">4. 개인정보의 제3자 제공</h2>
        <p>
          원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만 법령에
          의한 요구가 있거나 이용자의 동의가 있는 경우 제공할 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">5. 개인정보 처리 위탁</h2>
        <p>
          서비스 운영에 필요한 경우 일부 업무를 외부에 위탁할 수 있으며, 이 경우
          관련 법령에 따라 위탁업체와 위탁 업무 범위를 명시합니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">6. 이용자의 권리</h2>
        <p>
          이용자는 언제든 본인의 개인정보에 대해 열람, 정정, 삭제, 처리정지
          요구를 할 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">
          7. 개인정보 보호를 위한 조치
        </h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>접근 권한 최소화 및 관리</li>
          <li>암호화된 통신(HTTPS) 적용</li>
          <li>Supabase 인증 및 DB 보안 정책(RLS) 적용</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-2">8. 문의처</h2>
        <p>
          개인정보와 관련된 문의는 아래 이메일을 통해 접수하실 수 있습니다.{' '}
          <br />
          이메일:{' '}
          <a href="mailto:your@email.com" className="underline">
            your@email.com
          </a>
        </p>
      </section>

      <p className="text-sm text-muted-foreground mt-8">시행일: 2025-09-11</p>
    </div>
  );
};

export default page;
