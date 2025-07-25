// 끌어올리기 가능 여부 판단하는 유틸 함수 (끌어올리기 쿨타임)
export const canRaiseParty = (raised_date_time: string | null) => {
  // 끌어올린 기록이 없으면 바로 ok
  if (!raised_date_time) return { ok: true, wait: 0 };

  const now = new Date();
  const last = new Date(raised_date_time); // 마지막으로 끌어올린 시간

  // 시간 차이를 분 단위로 계산
  const diffMinutes = (now.getTime() - last.getTime()) / (1000 * 60);

  // 30분 이상 지났으면 ok: true
  // 남은시간(30 - 경과시간)을 소수점 올림해서 반환
  return {
    ok: diffMinutes >= 30,
    wait: Math.ceil(30 - diffMinutes),
  };
};
