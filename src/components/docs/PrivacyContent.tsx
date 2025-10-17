import DocsSection from './DocsSection';

const PrivacyContent = () => {
  return (
    <>
      <DocsSection>
        <strong>[서비스 명]</strong>(이하 “서비스”)는 「개인정보 보호법」 등
        관련 법령을 준수하며, 이용자의 개인정보를 안전하게 보호하기 위해 다음과
        같이 개인정보처리방침을 수립·공개합니다.
      </DocsSection>

      <DocsSection title="1. 수집하는 개인정보 항목">
        서비스는 회원 가입 및 이용 과정에서 다음과 같은 개인정보를 수집합니다.
        <ul className="list-disc ml-5 space-y-1">
          <li>
            수집 항목: 계정 식별자(UUID), 소셜 프로필 기본 정보(디스코드 별명,
            사용자명, 프로필 이미지 URL), 이메일 주소(디스코드 제공)
          </li>
          <li>
            수집 항목(선택): 자기소개(intro), 소셜명(social_name), 레벨(level),
            직업(job)
          </li>
          <li>
            자동 수집 항목: 자동 수집 항목: IP 주소, 브라우저/OS(User-Agent),
            로그인/접속 일시, 오류 로그
          </li>
          <li>
            수집 방법: Supabase를 통한 Discord OAuth 로그인 과정, 사용자의 직접
            입력, 서비스 이용 과정에서 자동 생성(로그)
          </li>
        </ul>
      </DocsSection>

      <DocsSection title="2. 개인정보의 이용 목적">
        <ul className="list-disc ml-5 space-y-1">
          <li>회원 식별 및 계정 관리, 부정 이용 방지</li>
          <li>파티 모집/참여, 프로필/마이페이지 기능 제공</li>
          <li>서비스 품질 개선, 오류 분석 및 고객 문의 대응</li>
          <li>관련 법령 준수 및 분쟁 대응</li>
        </ul>
      </DocsSection>

      <DocsSection title="3. 보유 및 이용 기간">
        <ul className="list-disc ml-5 space-y-1">
          <li>계정/프로필 정보: 회원 탈퇴 시 즉시 삭제</li>
          <li>
            운영/접속 로그: 플랫폼/호스팅 정책에 따라 짧은 기간 후 자동 파기
          </li>
          <li>백업 데이터: 별도 백업을 생성·보관하지 않음</li>
          <li>
            법령 예외: 관계 법령상 보존기간이 있는 경우 그 기간 최소 보관 후
            즉시 파기
          </li>
          <li>게시물/활동 기록: 탈퇴 시 익명화 또는 삭제(운영 정책에 따름)</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          ※ 추후 보유 기간이 늘어나는 경우 해당 기간을 본 방침에 업데이트합니다.
        </p>
      </DocsSection>

      <DocsSection title="4. 제3자 제공">
        서비스는 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 법령에 의한
        요구가 있거나 이용자의 사전 동의가 있는 경우에 한하여 필요한 범위 내에서
        제공할 수 있습니다.
        <p className="text-sm text-muted-foreground">
          참고: <strong>Discord OAuth</strong>는 사용자가 Discord에
          로그인·동의하면 Discord가 당사에 이메일/프로필 정보를 전달하는
          절차이며, 당사가 Discord에 이용자 개인정보를 제공하는 것은 아닙니다.
        </p>
      </DocsSection>

      <DocsSection title="5. 처리의 위탁">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-muted/60">
                <th className="p-2 border">수탁자</th>
                <th className="p-2 border">위탁 업무</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Supabase</td>
                <td className="p-2 border">인증(Auth) 및 데이터베이스 운영</td>
              </tr>
              <tr>
                <td className="p-2 border">Vercel</td>
                <td className="p-2 border">
                  웹 호스팅/배포 및 런타임 로그 처리
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection title="6. 국외 이전">
        <ul className="list-disc ml-5 space-y-1">
          <li>
            수탁자/국가(리전): Vercel(CDN/로그 등 일부 해외 인프라 사용 가능)
          </li>
          <li>이전 항목: 접속/오류 로그 등 서비스 제공에 필요한 범위</li>
          <li>이전 방법: 서비스 이용 시 네트워크 전송·저장</li>
          <li>보유·이용 기간: 제공사 정책 및 위탁 종료 시까지</li>
        </ul>
      </DocsSection>

      <DocsSection title="7. 이용자의 권리와 행사 방법">
        이용자는 개인정보에 대해 열람, 정정, 삭제를 요구할 수 있습니다.
        <ul className="list-disc ml-5 space-y-1">
          <li>
            방법: 마이페이지(회원탈퇴 포함)에서 직접 처리하거나
            이메일([stopbro0323@naver.com])로 요청하세요.
          </li>
          <li>
            본인확인 후 처리하며, 접수일로부터 14일 이내 결과를 통지합니다.
          </li>
          <li>
            법령상 보존 의무, 타인의 권리 침해 우려, 백업·플랫폼 로그 등은
            제공/삭제가 제한되거나 가명·요약 형태로 제공될 수 있습니다.
          </li>
        </ul>
      </DocsSection>

      <DocsSection title="8. 개인정보의 파기 절차 및 방법">
        보유기간 경과 또는 처리 목적 달성 시 지체 없이 파기합니다.
        <ul className="list-disc ml-5 space-y-1">
          <li>파기 대상: 계정/프로필 등 당사가 보관 중인 전자적 개인정보</li>
          <li>
            파기 절차: 탈퇴 요청 시 지체 없이 DB에서 삭제합니다. 운영/접속
            로그는 플랫폼 정책에 따라 단기간 보관 후 자동 파기됩니다.
          </li>
          <li>파기 방법: 전자적 파일은 복구 불가능한 방식으로 파기</li>
          <li>
            분쟁 해결·법령상 보존 의무가 있는 경우 해당 기간 최소한으로 보관 후
            파기합니다.
          </li>
        </ul>
      </DocsSection>

      <DocsSection title="9. 개인정보 보호를 위한 조치">
        <ul className="list-disc ml-5 space-y-1">
          <li>
            기술적 조치: 서비스 운영 환경에서 HTTPS/TLS 적용, 세션 쿠키 안전
            관리, Supabase RLS(행 수준 보안) 적용
          </li>
          <li>
            관리적 조치: 관리자 권한은 1인만 사용하며, 계정·비밀키는 외부에
            공유하지 않습니다.
          </li>
          <li>
            물리적 조치: 운영·호스팅을 위탁받은 클라우드 제공자의 보안 정책을
            따릅니다
          </li>
        </ul>
      </DocsSection>

      <DocsSection title="쿠키">
        로그인 상태 유지를 위해 세션 쿠키를 사용합니다. 브라우저 설정으로 저장을
        거부할 수 있으나 일부 기능이 제한될 수 있습니다.
      </DocsSection>

      <DocsSection title="10. 문의처">
        개인정보와 관련된 문의는 아래 이메일을 통해 접수하실 수 있습니다.
        <div>
          이메일:
          <a href="mailto:stopbro0323@naver.com" className="underline">
            stopbro0323@naver.com
          </a>
        </div>
      </DocsSection>

      <p className="text-sm text-muted-foreground mt-8">시행일: 2025-09-11</p>
    </>
  );
};

export default PrivacyContent;
