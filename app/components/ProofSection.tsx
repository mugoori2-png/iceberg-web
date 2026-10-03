"use client";

import { useState } from "react";

export default function ProofSection() {
  const [after, setAfter] = useState(true);
  return <section id="proof" className="scroll-mt-24 border-y border-line bg-navy2 px-5 py-20 md:px-10">
    <div className="mx-auto max-w-[1080px]">
      <p className="text-sm font-bold tracking-widest text-cyan">직접 만든 화면으로 확인하세요</p>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">설명보다, 실제 작업 화면.</h2>
      <p className="mt-5 max-w-2xl text-muted leading-7">학원 프로그램을 개발하며 개선한 화면입니다. 개선 전·후를 바꿔 보고, 휴대폰에서 쓰는 기능도 확인해보세요.</p>
      <p className="mt-4 rounded-xl border border-line px-4 py-3 text-sm leading-6 text-soft">실제 개발 화면에 가상 데이터를 넣어 촬영한 테스트 기록입니다. 화면 속 학생 수·점수는 운영 실적이 아닙니다.</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-line bg-navy p-5 md:p-8">
          <span className="text-sm text-cyan">01 / 관리자 화면 개선</span>
          <h3 className="mt-3 text-2xl font-bold">많이 스크롤하던 화면을 한눈에.</h3>
          <p className="mt-4 text-sm leading-7 text-muted">큰 카드와 반복 문구를 줄여, 같은 화면에서 보강할 단원과 현황을 더 많이 확인하도록 정리했습니다.</p>
          <div className="my-5 flex gap-2" role="group" aria-label="분석 화면 개선 전후 비교">
            {[false, true].map(value => <button key={String(value)} type="button" aria-pressed={after === value} onClick={() => setAfter(value)} className={`rounded-lg border px-5 py-3 text-sm font-bold ${after === value ? "border-cyan bg-cyan text-navy" : "border-line text-soft"}`}>{value ? "개선 후" : "개선 전"}</button>)}
          </div>
          <figure><a href={`/proof/analysis-${after ? "after" : "before"}.png`} target="_blank" rel="noreferrer" aria-label="분석 화면 원본 크게 보기"><img src={`/proof/analysis-${after ? "after" : "before"}.png`} alt={`학원 취약점 분석 ${after ? "개선 후: 요약과 우선 보강 단원을 간결하게 배치" : "개선 전: 큰 카드와 여백이 많은 배치"}`} width="390" height="844" className="mx-auto w-full max-w-[300px] rounded-xl border border-line" loading="lazy" /></a><figcaption aria-live="polite" className="mt-4 text-center text-xs text-muted">{after ? "개선 후" : "개선 전"} · 390px 휴대폰 화면 · 누르면 원본 보기</figcaption></figure>
          <a href="/works/learning-dashboard" className="mt-6 inline-block font-bold text-cyan">무엇을 바꿨는지 보기 →</a>
        </article>
        <article className="rounded-3xl border border-line bg-navy p-5 md:p-8">
          <span className="text-sm text-cyan">02 / 모바일 학습 기능</span>
          <h3 className="mt-3 text-2xl font-bold">긴 문제를 읽어도, 선택은 그대로.</h3>
          <p className="mt-4 text-sm leading-7 text-muted">오답노트에서 문제를 선택하고 내려가도 선택 개수와 삭제·취소 버튼을 바로 확인할 수 있도록 구성했습니다.</p>
          <div className="my-5 flex min-h-[46px] items-center gap-2 text-sm text-soft"><span className="rounded-lg border border-line px-4 py-3">문제 선택</span><span aria-hidden="true">→</span><span className="rounded-lg border border-line px-4 py-3">하단에서 확인</span></div>
          <figure><a href="/proof/wrongnote-mobile.png" target="_blank" rel="noreferrer" aria-label="오답노트 화면 원본 크게 보기"><img src="/proof/wrongnote-mobile.png" alt="오답노트를 아래로 내린 상태에서도 하단에 1개 선택과 취소·삭제 버튼이 표시되는 실제 테스트 화면" width="390" height="844" className="mx-auto w-full max-w-[300px] rounded-xl border border-line" loading="lazy" /></a><figcaption className="mt-4 text-center text-xs text-muted">가상 문제로 촬영한 개발 화면 · 누르면 원본 보기</figcaption></figure>
          <a href="/works/mobile-wrongnote" className="mt-6 inline-block font-bold text-cyan">기능 자세히 보기 →</a>
        </article>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-line p-6"><p className="leading-7">우리 홈페이지나 업무 화면도 바꾸고 싶으신가요?<br/><span className="text-sm text-muted">지금 쓰는 화면과 불편한 점 하나만 보내주세요.</span></p><a href="https://kmong.com/@김주루" className="btn-primary rounded-xl px-6 py-4 font-bold text-navy">내 작업 상담하기 →</a></div>
    </div>
  </section>;
}
