"use client";

import { useState } from "react";

const examples = [
  { title: "문구 교체", before: "여름 이벤트가 진행 중입니다", after: "가을 클래스 예약을 시작합니다", note: "받은 문구로 원하는 위치 한 곳을 바꿉니다." },
  { title: "배너 정리", before: "이벤트 안내", after: "가을 클래스", note: "준비된 이미지 한 장을 교체합니다. 새 디자인 제작은 별도 상담입니다." },
  { title: "버튼 정리", before: "자세한 사항은 문의해주세요", after: "수업 문의하기 →", note: "버튼 문구·모양·연결 주소를 확인합니다. 작업 범위에 따라 견적을 안내합니다." },
];

export default function SmallWorkDemo() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  return <section id="proof" className="scroll-mt-24 border-y border-line bg-navy2 px-5 py-20 md:px-10">
    <div className="mx-auto max-w-[1080px]">
      <p className="text-sm font-bold tracking-widest text-cyan">SMALL WORK · 작은 수정 예시</p>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">이 부분만 바꾸고 싶다면.</h2>
      <p className="mt-5 text-muted">문구, 이미지, 버튼. 필요한 부분부터 상담하세요.</p>
      <div className="my-8 flex flex-wrap gap-2" role="group" aria-label="작업 예시 선택">
        {examples.map((item, index) => <button type="button" key={item.title} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`rounded-full border px-5 py-3 text-sm font-bold ${selected === index ? "border-cyan bg-cyan text-navy" : "border-line text-soft"}`}>{item.title}</button>)}
      </div>
      <div className="grid gap-5 md:grid-cols-2" aria-live="polite">
        {[false, true].map(after => <figure key={String(after)} className="overflow-hidden rounded-2xl border border-line">
          <figcaption className={`flex items-center justify-between px-5 py-4 text-sm font-bold ${after ? "bg-cyan text-navy" : "bg-navy text-muted"}`}><span>{after ? "AFTER · 수정 후" : "BEFORE · 수정 전"}</span><span>예시 화면</span></figcaption>
          <div className="flex min-h-[280px] flex-col bg-[#f5f3ee] p-6 text-[#20362f] md:p-8">
            <div className="flex items-center justify-between border-b border-[#20362f]/15 pb-4 text-xs tracking-widest"><span>STUDIO AUTUMN</span><span>CLASS</span></div>
            <div className="flex flex-1 flex-col justify-center py-8">
              {selected === 0 && <><p className="mb-3 text-xs text-[#61756b]">NOTICE</p><p className={`max-w-[280px] text-2xl font-bold leading-snug ${after ? "text-[#20362f]" : "text-[#7c817e]"}`}>{after ? example.after : example.before}</p></>}
              {selected === 1 && <div className={`rounded-xl p-6 ${after ? "bg-[#20362f] text-[#e4f4b5]" : "bg-[#dfddd7] text-[#73716b]"}`}><p className="text-xs tracking-widest">{after ? "AUTUMN · 2026" : "SUMMER · 2026"}</p><p className="mt-4 text-3xl font-bold">{after ? example.after : example.before}</p><p className="mt-3 text-xs">{after ? "나에게 맞는 수업을 만나보세요" : "새로운 소식을 확인하세요"}</p></div>}
              {selected === 2 && <><p className="mb-6 text-xl font-bold">궁금한 수업이 있으신가요?</p><span className={`self-start rounded-lg px-5 py-4 text-sm ${after ? "bg-[#20362f] font-bold text-[#e4f4b5]" : "border border-[#c4c7c1] text-[#6e776f]"}`}>{after ? example.after : example.before}</span><p className="mt-3 text-xs text-[#61756b]">버튼 디자인 예시입니다.</p></>}
            </div>
          </div>
        </figure>)}
      </div>
      <p className="mt-5 leading-7 text-soft">{example.note}</p>
      <p className="mt-2 text-xs leading-6 text-muted">작업 방식을 보여주기 위해 직접 구현한 가상 브랜드 시연입니다. 고객 납품 사례가 아닙니다. 문구 1곳 또는 준비된 이미지 1장 교체는 5,000원부터이며, 결제 전 수정 가능 여부를 확인합니다.</p>
      <div className="mt-8 flex flex-wrap gap-4"><a href="https://kmong.com/gig/789321" className="btn-primary rounded-xl px-6 py-4 font-bold text-navy">내 화면 수정 문의하기 →</a><a href="/programs" className="btn-ghost rounded-xl px-6 py-4">성적·상담 프로그램 시연 보기 →</a></div>
    </div>
  </section>;
}
