const ContactPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">문의하기</h1>
      <p>문의 사항은 아래 이메일로 문의 바랍니다.</p>

      <div className="mt-6">
        <a className="underline" href="mailto:stopbro0323@naver.com">
          stopbro0323@naver.com
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
