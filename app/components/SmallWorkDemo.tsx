"use client";

import { useState } from "react";
import styles from "./SmallWorkDemo.module.css";

const examples = [
  { title: "홍보 카드", before: "가을 클래스 예약을 시작합니다", note: "같은 소식도 제목의 크기, 배경과 여백을 정리하면 먼저 눈에 들어옵니다." },
  { title: "이벤트 배너", before: "가을 클래스 안내 · 나에게 맞는 수업을 만나보세요", note: "흩어진 안내를 하나의 메시지로 모으고, 브랜드 색상과 그래픽으로 분위기를 만듭니다." },
  { title: "문의 화면", before: "궁금한 수업이 있으신가요? 자세한 사항은 문의해주세요", note: "문의할 이유와 다음 행동이 보이도록 제목, 안내와 버튼을 함께 정리합니다." },
];

export default function SmallWorkDemo() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  return <section id="proof" className="scroll-mt-24 border-y border-line bg-navy2 px-5 py-20 md:px-10">
    <div className="mx-auto max-w-[1080px]">
      <p className="text-sm font-bold tracking-widest text-cyan">DESIGN PREVIEW · 직접 만든 디자인 예시</p>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">같은 내용, 달라지는 첫인상.</h2>
      <p className="mt-5 text-muted">밋밋한 안내도, 우리 브랜드다운 한 장으로.</p>
      <div className="my-8 flex flex-wrap gap-2" role="group" aria-label="작업 예시 선택">
        {examples.map((item, index) => <button type="button" key={item.title} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`rounded-full border px-5 py-3 text-sm font-bold ${selected === index ? "border-cyan bg-cyan text-navy" : "border-line text-soft"}`}>{item.title}</button>)}
      </div>
      <div className={styles.comparison} aria-live="polite">
        <figure className={styles.frame}>
          <figcaption className={styles.caption}><span>BEFORE <small>수정 전</small></span><span>기본 안내</span></figcaption>
          <div className={styles.before}>
            <div className={styles.oldHeader}>STUDIO AUTUMN <span>CLASS</span></div>
            <div className={styles.oldContent}><span>NOTICE</span><p>{example.before}</p>{selected === 2 && <span className={styles.oldButton}>문의하기</span>}</div>
          </div>
        </figure>
        <figure className={`${styles.frame} ${styles.afterFrame}`}>
          <figcaption className={`${styles.caption} ${styles.afterCaption}`}><span>AFTER <small>디자인 개선</small></span><span>ICEBERG DESIGN ↗</span></figcaption>
          <div className={`${styles.artboard} ${styles["theme" + selected]}`}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.artHeader}><span>STUDIO<br/><b>AUTUMN.</b></span><span>2026<br/>FALL EDITION</span></div>
            <div className={styles.artCopy}>
              <span className={styles.eyebrow}>{["A NEW SEASON, A NEW YOU", "MAKE TIME FOR YOURSELF", "LET’S FIND YOUR CLASS"][selected]}</span>
              <h3>{selected === 0 ? <>새로운 계절,<br/>나를 위한 <em>클래스.</em></> : selected === 1 ? <>일상에 더하는<br/><em>작은 취향.</em></> : <>나에게 맞는 수업,<br/><em>함께 찾아볼까요?</em></>}</h3>
              <p>{["가을 클래스 예약을 시작합니다.", "나에게 맞는 가을 클래스를 만나보세요.", "관심 있는 수업과 가능한 시간을 알려주세요."][selected]}</p>
            </div>
            <div className={styles.sculpture} aria-hidden="true"><i/><i/><i/><span>{selected === 1 ? "a." : "A"}</span></div>
            <div className={styles.artFooter}><span className={styles.demoCta}>{["클래스 살펴보기", "가을 클래스 보기", "수업 문의하기"][selected]} <b>↗</b></span><span>가상 브랜드<br/>디자인 시연</span></div>
          </div>
        </figure>
      </div>
      <p className="mt-5 leading-7 text-soft">{example.note}</p>
      <p className="mt-2 text-xs leading-6 text-muted">직접 제작한 가상 브랜드 디자인 시연으로, 고객 납품 사례가 아닙니다. 위와 같은 새 디자인·배경·레이아웃 제작은 별도 견적입니다. 5,000원은 문구 1곳 또는 준비된 이미지 1장 교체 기준입니다.</p>
      <div className="mt-8 flex flex-wrap gap-4"><a href="https://kmong.com/gig/789321" className="btn-primary rounded-xl px-6 py-4 font-bold text-navy">내 화면 수정 문의하기 →</a><a href="/programs" className="btn-ghost rounded-xl px-6 py-4">성적·상담 프로그램 시연 보기 →</a></div>
    </div>
  </section>;
}
