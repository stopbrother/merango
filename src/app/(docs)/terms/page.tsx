import DocsSection from '@/components/docs/DocsSection';

const TermsPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">이용약관</h1>

      <DocsSection title="1. 목적">
        이 약관은 <strong>[서비스 명]</strong>(이하 “서비스”)의 이용조건과
        운영기준을 정합니다.
      </DocsSection>

      <DocsSection title="2. 계정 및 연령">
        서비스는 Discord OAuth로 가입·로그인합니다. 만 14세 미만은 서비스를
        이용할 수 없습니다. 계정 보안과 활동에 대한 책임은 이용자에게 있습니다.
      </DocsSection>

      <DocsSection title="3. 이용자 콘텐츠">
        게시물의 저작권은 작성자에게 있습니다. 이용자는 서비스 제공·운영·보안
        목적의 범위에서 서비스가 게시물을 화면에 표시하고, DB에 저장·백업하고,
        네트워크로 전송하며, 썸네일 생성과 형식·크기 조정 등 표시·보관에 필요한
        기술적 처리를 할 수 있도록 비독점적·무상으로 허락합니다. 서비스는 필요한
        범위 내에서 인프라 제공자(CDN·호스팅 등)에게 위 권한을 하위 이용허락할
        수 있습니다. 서비스는 위 목적을 넘어 게시물을 이용하지 않습니다. 삭제된
        게시물도 기술적 한계로 백업·로그에는 일정 기간 잔존할 수 있습니다.
        운영정책이나 법령을 위반한 게시물은 사전 통지 없이 숨김·삭제하거나
        계정을 제한할 수 있으며, 권리침해 신고가 있으면 임시조치 등 합리적
        조치를 합니다.
      </DocsSection>

      <DocsSection title="4. 금지행위">
        불법 정보, 타인 권리 침해, 사기·허위 모집, 스팸, 악성코드,
        리버스엔지니어링, 사전 허용 없는 크롤링·스크래핑 등을 금지합니다.
      </DocsSection>

      <DocsSection title="5. 제재">
        약관·법령 위반 또는 운영상 필요 시 사전 통지 없이 게시물 삭제, 노출
        제한, 계정 일시정지·해지를 할 수 있습니다. 중대한 위반은 즉시 해지될 수
        있습니다. 세부 기준은 운영정책을 따릅니다.
      </DocsSection>

      <DocsSection title="6. 서비스 제공">
        서비스는 “있는 그대로” 제공되며, 항상 중단 없이 동작하거나 오류가 없다고
        보장하지 않습니다. 일부 기능은 변경·중단될 수 있습니다. 장애, 데이터
        손실, 제3자 서비스(Supabase, Vercel, Discord 등) 사유로 인한 손해에 대해
        서비스는 법이 허용하는 한도 내에서 책임을 부담하지 않습니다.
      </DocsSection>

      <DocsSection title="7. 외부 서비스·권리 고지">
        연결된 외부 서비스(Supabase, Vercel, Discord 등)는 각 제공자의 정책이
        적용되며 해당 제공자가 책임을 집니다. 본 서비스는 넥슨, ‘메이플스토리’,
        ‘MapleStory Worlds’, ‘MapleLand’와 무관한 비공식 팬 프로젝트이며,
        상표·저작권은 각 권리자에게 있습니다.
      </DocsSection>

      <DocsSection title="8. 신고 및 권리 보호">
        권리침해 주장자는 증빙과 함께 아래 이메일로 요청할 수 있습니다. 서비스는
        신속히 조치하고 결과를 통지합니다. 정당한 재게시 신청 시 절차에 따라
        처리합니다.
        <div>
          이메일:{' '}
          <a className="underline" href="mailto:stopbro0323@naver.com">
            stopbro0323@naver.com
          </a>
        </div>
      </DocsSection>

      <DocsSection title="9. 책임 제한">
        간접·특별·결과적 손해에 책임을 지지 않습니다. 서비스의 총 책임 한도는
        이용자가 최근 3개월간 실제로 지급한 금액을 넘지 않으며, 유료 결제가
        없으면 0원입니다. 고의·중과실이 있는 경우는 법이 정한 범위에서 달라질 수
        있습니다.
      </DocsSection>

      <DocsSection title="10. 통지 및 약관 변경">
        약관은 변경될 수 있으며, 중요 변경은 시행 7일 전에 서비스 내 공지 또는
        이메일로 고지합니다. 이용자가 계속 이용하면 동의한 것으로 봅니다.
      </DocsSection>

      <DocsSection title="11. 준거법 및 관할">
        본 약관은 대한민국 법을 따르며, 분쟁은 서울중앙지방법원을 전속 관할로
        합니다.
      </DocsSection>

      <p className="text-sm text-muted-foreground mt-8">시행일: YYYY-MM-DD</p>
    </div>
  );
};

export default TermsPage;
