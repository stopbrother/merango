const Guidepage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">이용가이드</h1>
      </div>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1. 빠른 시작</h2>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>디스코드 로그인</li>
          <li>약관 동의</li>
          <li>프로필 설정</li>
          <li>파티구인 및 구직</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">2. 프로필 설정</h2>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>필수: 닉네임, 레벨, 직업 / 선택: 소셜 코드</li>
          <li>작성/참가시 필수 프로필이 등록되어있어야 합니다.</li>
        </ul>
      </section>
    </div>
  );
};

export default Guidepage;
