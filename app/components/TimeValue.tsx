"use client";
import { useState } from "react";

export default function TimeValue() {
  const [minutes, setMinutes] = useState(20);
  const [days, setDays] = useState(20);
  const total = minutes * days;
  return <section className="border-y border-line bg-navy2 px-6 py-20 md:px-10">
    <div className="mx-auto grid max-w-[980px] gap-10 md:grid-cols-2 md:items-center">
      <div><p className="text-sm font-bold tracking-widest text-cyan">TIME MATTERS · 시간을 되찾는 일</p>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">반복 업무에 쓰던 시간을,<br />중요한 일에 쓰세요.</h2>
        <p className="mt-5 leading-8 text-muted">한글 문서에 같은 내용 넣기, 엑셀 자료 옮기기, 학생 명단과 출결 정리. 매번 조금씩 쓰는 시간도 한 달이면 커집니다. 가장 자주 반복하는 일 하나부터 줄여드립니다.</p>
        <a href="/automation" className="mt-6 inline-block font-bold text-cyan">한글 HWPX·반복 업무 자동화 보기 →</a></div>
      <div className="lux-card rounded-2xl p-7"><h3 className="text-lg font-bold">내 반복 업무는 한 달에 얼마나 될까요?</h3>
        <label className="mt-6 block text-sm text-muted">하루 반복 작업 시간: <strong className="text-ink">{minutes}분</strong><input aria-label="하루 반복 작업 시간" className="mt-3 block w-full accent-cyan" type="range" min="5" max="120" step="5" value={minutes} onChange={e=>setMinutes(Number(e.target.value))} /></label>
        <label className="mt-5 block text-sm text-muted">한 달 작업 일수: <strong className="text-ink">{days}일</strong><input aria-label="한 달 작업 일수" className="mt-3 block w-full accent-cyan" type="range" min="1" max="31" value={days} onChange={e=>setDays(Number(e.target.value))} /></label>
        <p aria-live="polite" className="mt-7 text-3xl font-extrabold text-cyan">월 {Math.floor(total/60)}시간 {total%60}분</p>
        <p className="mt-3 text-xs leading-6 text-muted">현재 반복 업무에 쓰는 시간의 계산 예시입니다. 예상 절약 시간은 자동화 범위와 결과 검수 시간을 확인한 뒤 안내합니다.</p></div>
    </div>
  </section>;
}
