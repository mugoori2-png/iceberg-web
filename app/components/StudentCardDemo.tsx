"use client";
import { useState } from "react";

const summary = "최근 평균 82점 · 이전 평균 74점 대비 8점 상승. 형사법은 강점이며 영어 복습이 필요합니다.";
export default function StudentCardDemo() {
  const [tab, setTab] = useState("성적 요약");
  const [note, setNote] = useState("영어 오답을 함께 확인하고, 다음 상담에서 복습 여부를 점검합니다.");
  const [inserted, setInserted] = useState(false);
  return <section id="student-demo" className="scroll-mt-24 px-5 py-20 md:px-10">
    <div className="mx-auto max-w-[1080px]">
      <p className="text-sm font-bold tracking-widest text-cyan">최근 개발 · 성적관리와 상담</p>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">학생 한 명의 성적부터 상담까지,<br/>한곳에서 이어집니다.</h2>
      <p className="mt-5 max-w-2xl leading-7 text-muted">학생을 찾고, 성적 변화를 확인하고, 상담에 필요한 내용을 기록합니다. 화면을 옮겨 다니며 다시 입력하던 일을 줄이도록 만들었습니다.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">{["학생별 성적 모아 보기", "강점·보완 과목 확인", "성적 요약을 상담에 넣기"].map((s,i)=><p key={s} className="rounded-xl border border-line p-4 text-sm"><span className="mr-3 text-cyan">0{i+1}</span>{s}</p>)}</div>
      <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-white text-slate-900">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 text-sm"><strong>공개 체험 화면</strong><span className="ml-3 text-slate-600">가상 학생·가상 성적</span></div>
        <div className="p-5 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><h3 className="text-2xl font-extrabold">학생 A</h3><p className="mt-1 text-sm text-slate-500">성적과 상담을 연결하는 학생 카드</p></div><button type="button" onClick={()=>{setNote("영어 오답을 함께 확인하고, 다음 상담에서 복습 여부를 점검합니다.");setInserted(false);setTab("성적 요약");}} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">체험 초기화</button></div>
          <div className="my-6 flex gap-2" role="tablist" aria-label="학생 카드 기능">{["성적 요약","상담 기록"].map(t=><button key={t} id={t === "성적 요약" ? "grade-tab" : "consult-tab"} type="button" role="tab" aria-selected={tab===t} aria-controls="student-demo-panel" onClick={()=>setTab(t)} className={`rounded-lg px-5 py-3 font-bold ${tab===t?"bg-slate-900 text-white":"bg-slate-100 text-slate-600"}`}>{t}</button>)}</div>
          <div id="student-demo-panel" role="tabpanel" aria-labelledby={tab === "성적 요약" ? "grade-tab" : "consult-tab"}>
            {tab === "성적 요약" ? <>
              <div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-blue-50 p-5"><p className="text-sm text-slate-600">최근 평균</p><p className="mt-2 text-3xl font-bold">82<span className="text-base">점</span></p></div><div className="rounded-xl bg-slate-50 p-5"><p className="text-sm text-slate-600">이전 평균 대비</p><p className="mt-2 text-3xl font-bold text-blue-700">+8<span className="text-base">점</span></p></div></div>
              <h4 className="mb-4 mt-7 font-bold">과목별로 보면</h4>
              <div className="space-y-4">{[["형사법",90],["해양경찰학",86],["영어",70]].map(([name,score])=><div key={name} className="grid grid-cols-[80px_1fr_48px] items-center gap-3 text-sm"><span>{name}</span><div className="h-3 rounded-full bg-slate-100"><div className={`h-3 rounded-full ${Number(score)<75?"bg-rose-500":"bg-blue-600"}`} style={{width:`${score}%`}}/></div><span className="text-right font-bold">{score}점</span></div>)}</div>
              <p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-7">{summary}</p>
              <button type="button" onClick={()=>setTab("상담 기록")} className="mt-5 rounded-lg bg-blue-700 px-5 py-3 font-bold text-white">이 성적으로 상담 기록하기 →</button>
            </> : <>
              <div className="flex flex-wrap items-center justify-between gap-3"><label htmlFor="sample-note" className="font-bold">학습 상담</label><button type="button" disabled={inserted} onClick={()=>{setNote(n=>`${summary}\n\n${n}`);setInserted(true);}} className="rounded-lg bg-blue-50 px-4 py-3 text-sm font-bold text-blue-800 disabled:opacity-50">{inserted?"성적 요약을 넣었습니다":"성적 요약 넣기"}</button></div>
              <textarea id="sample-note" value={note} onChange={e=>setNote(e.target.value)} rows={7} maxLength={2000} className="mt-4 w-full rounded-xl border border-slate-300 p-4 text-base leading-7" />
              <p className="mt-3 text-sm text-slate-500" role="status">체험용 메모입니다. 서버에 전송하거나 저장하지 않으며 새로고침하면 사라집니다.</p>
            </>}
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs leading-6 text-muted">2026년 10월 개발한 학생 카드의 기능을 바탕으로 공개용으로 재구성했습니다. 실제 운영 화면 캡처가 아니며, 이름·점수·상담 내용은 모두 가상입니다. 실제 기능에는 시험 종류별 성적 요약, 성적 추이, 상담 서식 편집·자동 저장이 포함됩니다.</p>
      <div className="mt-6 flex flex-wrap gap-6"><a href="/works/student-grade-consult" className="font-bold text-cyan">개발 내용 자세히 보기 →</a><a href="https://kmong.com/gig/821186" className="font-bold text-cyan">우리 학원 프로그램 상담하기 →</a></div>
    </div>
  </section>;
}
