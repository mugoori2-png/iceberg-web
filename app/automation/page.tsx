"use client";

import { useState } from "react";
import TimeValue from "../components/TimeValue";

// ─────────────────────────────────────────────
// CTA 링크: 크몽 상품 링크가 생기면 여기만 바꾸면 됩니다.
const KMONG_URL = "https://kmong.com/@김주루"; // 업무 자동화 상품 상세 링크가 생기면 그걸로 교체
// ─────────────────────────────────────────────

const PAIN_POINTS = [
  "한글 문서에 같은 내용을 넣고 서식을 맞추는 일을 반복하고 있다",
  "같은 내용의 문서를 수십·수백 장씩 하나하나 만들고 있다",
  "여러 파일에 흩어진 데이터를 손으로 옮겨 붙이다 실수가 난다",
  "이 일을 자동으로 할 수 있을 것 같은데, 누구에게 맡겨야 할지 모르겠다",
];

const HERO_CARDS = [
  { title: "한글 HWPX 자동화", desc: "정해진 양식 채우기, 시험지·정답지·해설지 등 반복 문서 생성.", highlight: true },
  { title: "엑셀·자료 정리", desc: "취합, 분류, 집계처럼 매번 같은 순서로 처리하는 작업.", highlight: false },
  { title: "이미지 · 파일 처리", desc: "스캔 이미지 판독, 파일 이름 정리, 폴더 분류까지 자동으로.", highlight: false },
  { title: "업무 파이프라인", desc: "여러 단계를 한 흐름으로 묶어 시작부터 끝까지 자동으로 흘러가게.", highlight: true },
];

const SERVICES = [
  { title: "단일 작업 자동화", desc: "엑셀 정리, 파일 변환처럼 하나의 반복 작업을 프로그램으로 만듭니다." },
  { title: "문서 자동 생성", desc: "데이터만 넣으면 한글(HWPX)·워드 문서가 규격대로 나오는 생성기를 만듭니다." },
  { title: "업무 전체 자동화", desc: "입력 → 처리 → 문서 → 정리까지 여러 단계를 하나의 흐름으로 묶습니다." },
];

const SCOPE_ITEMS = [
  { label: "엑셀 취합 · 집계 · 서식 정리" },
  { label: "한글(HWP/HWPX) 문서 자동 생성", highlight: true },
  { label: "워드 · PDF 대량 생성" },
  { label: "스캔 이미지 판독 · 채점", highlight: true },
  { label: "데이터 변환 · 정리" },
  { label: "파일 이름 · 폴더 자동 정리" },
  { label: "웹 자료 수집 정리" },
  { label: "AI 결합 자동화 (분류 · 요약)" },
];

const STEPS = [
  { title: "업무 설명", desc: "지금 손으로 하고 있는 작업을 그대로 설명해주세요. 화면 캡처나 파일 예시면 충분합니다." },
  { title: "자동화 설계 · 견적", desc: "어디까지 자동화할 수 있는지, 어떤 방식이 맞는지 정리해 견적을 안내드립니다." },
  { title: "제작 · 테스트", desc: "실제 파일로 함께 테스트하며 결과물이 실무 기준에 맞을 때까지 조정합니다." },
  { title: "전달 · 사용 안내", desc: "클릭 한 번으로 쓸 수 있게 전달하고, 사용법을 쉽게 안내드립니다." },
];

const TIERS = [
  {
    name: "단일 자동화",
    tagline: "반복 작업 하나부터",
    price: "20만원",
    features: ["입력·처리 규칙·결과 각 1종", "HWPX 1쪽·고정 항목 10개 이내 등", "7일 · 합의 범위 수정 2회", "실행 구성 파일과 사용 안내"],
    recommended: false,
  },
  {
    name: "문서 자동 생성",
    tagline: "데이터 → 문서 대량 생성",
    price: "개별 견적",
    features: ["한글(HWPX) · 워드 자동 생성", "서식 · 규격 맞춤", "대량 생성 (수백 장)", "실제 파일로 검수"],
    recommended: true,
  },
  {
    name: "업무 전체 자동화",
    tagline: "시작부터 끝까지 한 흐름",
    price: "개별 견적",
    features: ["여러 단계 파이프라인 구축", "AI 결합 (분류 · 요약 등)", "관리 화면 (필요시)", "운영 정착 지원"],
    recommended: false,
  },
];

const FAQS = [
  {
    q: "제 업무도 자동화가 되는지 어떻게 아나요?",
    a: "지금 하시는 작업을 그대로 설명해주시면 됩니다. '이 파일을 열어서, 이걸 복사해서, 여기 붙인다' 수준이면 충분합니다. 자동화가 어렵거나 효율이 안 나오는 일이면 솔직하게 안 된다고 말씀드립니다.",
  },
  {
    q: "한글(HWPX) 문서도 정말 되나요?",
    a: "한글 HWPX 시험지·정답지·해설지 생성 경험이 있습니다. 원본 HWP는 HWPX 변환 가능 여부와 서식 보존 상태를 먼저 확인합니다. 문서 구조와 표·쪽 구성에 따라 제작 범위가 달라집니다.",
  },
  {
    q: "프로그램을 받으면 어떻게 쓰나요?",
    a: "더블클릭이나 버튼 한 번으로 실행되게 만들어드립니다. 컴퓨터를 잘 몰라도 쓸 수 있는 수준을 기준으로 하고, 사용법을 화면과 함께 안내드립니다.",
  },
  {
    q: "회사 파일을 보내야 하나요? 보안이 걱정됩니다.",
    a: "실제 데이터 대신 형식이 같은 샘플 파일로도 제작 가능합니다. 전달받은 자료는 제작 용도로만 쓰고 완료 후 요청 시 폐기합니다.",
  },
  {
    q: "만든 뒤에 업무 방식이 바뀌면요?",
    a: "서식이나 규칙이 바뀌면 수정이 필요할 수 있습니다. 가벼운 수정은 빠르게 처리해드리고, 자주 바뀌는 업무라면 유지보수 구독으로 맡기실 수 있습니다.",
  },
  {
    q: "기간은 얼마나 걸리나요?",
    a: "단일 자동화는 보통 3~7일, 문서 생성기는 1~2주, 전체 파이프라인은 범위에 따라 2~4주 정도입니다. 업무 확인 후 정확한 일정을 안내드립니다.",
  },
  {
    q: "엑셀 매크로와는 뭐가 다른가요?",
    a: "매크로로 충분한 일이면 매크로로 해드립니다. 다만 여러 파일·여러 프로그램을 오가는 일, 한글 문서 생성, 이미지 판독, AI 분류 같은 작업은 매크로 범위를 넘어서기 때문에 별도 프로그램으로 만듭니다.",
  },
];

const NAV_LINKS = [
  { label: "작업실 홈", href: "/" },
  { label: "서비스", href: "#services" },
  { label: "작업사례", href: "#portfolio" },
  { label: "진행방식", href: "#process" },
  { label: "가격", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const PORTFOLIO_CASES = [
  {
    title: "OMR 스캔 자동 채점 (실운영)",
    desc: "답안지 스캔 이미지를 판독해 자동 채점·집계합니다. 195명 분량을 분 단위에 끝냈습니다.",
    works: ["스캔 이미지 판독", "마킹 인식 · 채점", "엑셀 자동 집계", "오류 검출"],
    tags: ["#이미지판독", "#자동채점", "#실운영"],
    live: true,
  },
  {
    title: "한글(HWPX) 시험지 자동 생성 (실운영)",
    desc: "문제 데이터에서 시험지·정답지·해설지 3종 한글 문서를 클릭 한 번에 생성합니다.",
    works: ["HWPX 문서 생성", "보기 순서 섞기", "해설 번호 자동 재정렬", "정답 색상 표기"],
    tags: ["#한글자동화", "#대량생성", "#실운영"],
    live: true,
  },
  {
    title: "성적 집계 · 리포트 자동화 (실운영)",
    desc: "여러 시험 성적을 모아 등수·통계·개인 리포트까지 자동 산출하는 흐름을 운영 중입니다.",
    works: ["성적 데이터 취합", "등수 · 통계 산출", "개인별 리포트", "과락 판정 자동화"],
    tags: ["#집계자동화", "#리포트", "#실운영"],
    live: true,
  },
  {
    title: "거래처 서류 대량 생성 (구성 예시)",
    desc: "엑셀 명단에서 계약서·증명서·안내문을 인원수만큼 자동 생성하는 대표 구성입니다.",
    works: ["엑셀 명단 읽기", "문서 서식 채우기", "파일명 규칙 저장", "PDF 변환"],
    tags: ["#서류자동화", "#대량생성"],
    live: false,
  },
];

const TRUST_CARDS = [
  {
    title: "매일 실무에서 쓰는 자동화",
    desc: "판매용 데모가 아니라, 학원 운영 실무에서 매일 돌아가는 자동화(채점·문서 생성·집계)를 직접 만들어 쓰고 있습니다. 실무에서 안 깨지는 기준으로 만듭니다.",
  },
  {
    title: "한글(HWPX) 문서 전문",
    desc: "국내 실무의 핵심인 한글 문서 자동화를 깊게 다뤄왔습니다. 제공된 양식을 기준으로 문서를 생성하고 표·쪽 구성과 결과를 검수합니다.",
  },
  {
    title: "쓰는 사람 기준의 결과물",
    desc: "개발자만 쓸 수 있는 도구가 아니라, 클릭 한 번으로 실행되고 결과가 익숙한 엑셀·한글로 나오는 프로그램을 만듭니다.",
  },
  {
    title: "안 되는 건 안 된다고 말합니다",
    desc: "자동화 효율이 안 나오는 일, 손으로 하는 게 더 나은 일은 견적 단계에서 솔직하게 말씀드립니다.",
  },
];

// ───────────────────────── UI 조각들

function CtaButton({ children, secondary = false }: { children: React.ReactNode; secondary?: boolean }) {
  return (
    <a
      href={KMONG_URL}
      className={
        secondary
          ? "btn-ghost rounded-xl px-8 py-4 text-[17px] font-semibold text-ink"
          : "btn-primary rounded-xl px-8 py-4 text-[17px] font-extrabold text-navy"
      }
    >
      {children}
    </a>
  );
}

function SectionLabel({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return center ? (
    <p className="eyebrow mb-4 text-[12px] font-bold text-cyan">{children}</p>
  ) : (
    <p className="mb-3 text-sm font-bold tracking-wider text-cyan">{children}</p>
  );
}

// ───────────────────────── 페이지

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-navy text-ink">
      {/* 1. Header */}
      <header className="sticky top-0 z-50 border-b border-line bg-navy/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5 md:px-10">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5">
              <img src="/logo.png?v=2" alt="ICEBERG" className="h-[30px] w-[30px]" />
              <span className="flex flex-col leading-none">
                <span className="text-[17px] font-extrabold tracking-tight">ICEBERG</span>
                <span className="mt-0.5 text-[9px] font-semibold tracking-[0.14em] text-dim">Idea · Code · Execute</span>
              </span>
            </a>
            <span className="hidden h-5 w-px bg-[rgba(148,178,255,0.2)] sm:block" />
            <span className="hidden text-[15px] font-bold text-soft sm:block">업무 자동화 프로그램</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-ink">
                {l.label}
              </a>
            ))}
            <a href={KMONG_URL} className="btn-primary rounded-lg px-4 py-2 font-bold text-navy">
              크몽 문의하기
            </a>
          </nav>
          <div className="flex items-center gap-3 lg:hidden">
            <a href={KMONG_URL} className="btn-primary rounded-lg px-3.5 py-2 text-sm font-bold text-navy">
              크몽 문의하기
            </a>
            <button
              type="button"
              aria-label="메뉴 열기"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-line"
            >
              <span className="h-0.5 w-4 rounded bg-ink" />
              <span className="h-0.5 w-4 rounded bg-ink" />
              <span className="h-0.5 w-4 rounded bg-ink" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-line bg-navy px-6 py-3 lg:hidden">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-[15px] text-soft"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* 2. Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-20 text-center md:px-10 md:pt-28">
        <div
          className="pointer-events-none absolute -top-52 left-1/2 h-[480px] w-[820px] -translate-x-1/2 animate-glow"
          style={{ background: "radial-gradient(ellipse at center, rgba(76,141,255,0.18), rgba(47,214,255,0.06) 55%, transparent 75%)" }}
        />
        <div className="relative mx-auto flex max-w-[900px] flex-col items-center gap-7">
          <div className="rounded-full border border-[rgba(47,214,255,0.25)] bg-[rgba(47,214,255,0.07)] px-4 py-1.5 text-[13px] font-semibold text-cyan md:text-sm">
            학원 · 사무직 · 소상공인 · 자영업 — 실무에서 매일 돌아가는 자동화 경험으로 만듭니다
          </div>
          <h1 className="text-[40px] font-extrabold leading-[1.14] tracking-tighter md:text-[64px] lg:text-[72px]">
            반복 업무에 쓰던 시간,
            <br />
            <span className="text-accent">중요한 일에 쓰세요.</span>
          </h1>
          <p className="max-w-[640px] text-[17px] leading-relaxed text-muted md:text-xl">
            한글 HWPX 문서 생성, 엑셀 정리, 파일 취합과 반복 입력. 매일 번거로운 일을 줄이는 프로그램을 만듭니다.
            <br className="hidden md:block" /> 지금 하시는 작업을 설명만 해주시면 자동화 가능 여부를 확인해드립니다.
          </p>
          <div className="mt-1 flex flex-col gap-3.5 sm:flex-row">
            <CtaButton>크몽 문의하기</CtaButton>
            <a href="#pricing" className="btn-ghost rounded-xl px-8 py-4 text-[17px] font-semibold text-ink">
              가격 안내
            </a>
          </div>
        </div>

        {/* 4대 분야 카드 */}
        <div className="relative mx-auto mt-16 grid max-w-[1000px] grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
          {HERO_CARDS.map((c) => (
            <div
              key={c.title}
              className={`lux-card card-hover flex flex-col gap-2 rounded-2xl p-6 ${
                c.highlight ? "!border-[rgba(47,214,255,0.4)]" : ""
              }`}
            >
              <div
                className={`mb-1 flex h-10 w-10 items-center justify-center rounded-lg border ${
                  c.highlight
                    ? "border-[rgba(47,214,255,0.4)] bg-[rgba(47,214,255,0.1)]"
                    : "border-[rgba(76,141,255,0.3)] bg-[rgba(76,141,255,0.1)]"
                }`}
              >
                <div className={`h-3.5 w-3.5 rounded-[4px] border-2 ${c.highlight ? "border-cyan" : "border-accent"}`} />
              </div>
              <p className={`text-lg font-extrabold ${c.highlight ? "text-cyan" : ""}`}>{c.title}</p>
              <p className="text-sm leading-relaxed text-muted">{c.desc}</p>
            </div>
          ))}
        </div>

        <figure className="mx-auto mt-14 max-w-[720px]">
          <img src="/brand/hwpx-service.png" alt="ICEBERG 한글 HWPX 문서 자동화 — 시험지·서식·반복 문서" width="1448" height="1086" className="w-full rounded-2xl border border-line" />
          <figcaption className="mt-3 text-xs text-dim">서비스 소개를 위한 브랜드 이미지입니다.</figcaption>
        </figure>
      </section>
      <TimeValue />

      {/* 3. 문제 공감 */}
      <section className="border-t border-line bg-navy2 px-6 py-24 md:px-10 md:py-28">
        <p className="mx-auto mb-16 max-w-[640px] text-center text-[17px] leading-[1.75] text-muted md:text-[19px]">
          하루 30분짜리 반복 작업도 1년이면 120시간이 넘습니다.
          <br />
          <strong className="font-bold text-ink">그 시간에 해야 할 더 중요한 일이 있으실 겁니다.</strong>
        </p>
        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-10 md:grid-cols-[360px_1fr] md:gap-16">
          <div>
            <SectionLabel>이런 상황이라면</SectionLabel>
            <h2 className="text-[32px] font-extrabold leading-tight tracking-tight md:text-[40px]">
              사람이 안 해도 되는 일에
              <br />
              시간을 쓰고 있진 않나요?
            </h2>
          </div>
          <div className="flex flex-col">
            {PAIN_POINTS.map((p, i) => (
              <div
                key={i}
                className={`flex items-baseline gap-4 py-6 ${i < PAIN_POINTS.length - 1 ? "border-b border-line" : ""}`}
              >
                <span className="shrink-0 text-[15px] font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[16px] leading-relaxed text-soft md:text-[17px]">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 서비스 소개 */}
      <section className="border-t border-line px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>서비스 소개</SectionLabel>
          <h2 className="mx-auto mb-5 max-w-[680px] text-center text-[32px] font-extrabold leading-tight tracking-tight md:text-[40px]">
            작은 자동화 하나부터,
            <br />
            업무 전체 흐름까지.
          </h2>
          <p className="mx-auto mb-14 max-w-[600px] text-center text-[16px] leading-[1.7] text-muted md:text-[17px]">
            거창한 시스템부터 권하지 않습니다. 지금 가장 시간을 잡아먹는 작업 하나부터 자동화하고, 효과를 본 뒤에
            넓혀가는 방식을 추천합니다.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="lux-card card-hover flex flex-col gap-3 rounded-2xl p-8">
                <p className="text-[19px] font-bold text-accent">{s.title}</p>
                <p className="text-[15px] leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 작업 가능 범위 */}
      <section id="services" className="scroll-mt-20 border-t border-line bg-navy2 px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel>작업 가능 범위</SectionLabel>
          <h2 className="mb-11 text-[32px] font-extrabold tracking-tight md:text-[40px]">이런 일을 자동으로 만듭니다</h2>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {SCOPE_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`lux-card rounded-xl px-5 py-5 text-[15px] ${
                  item.highlight ? "!border-[rgba(47,214,255,0.4)] font-bold text-cyan" : "font-semibold"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
          <p className="mt-6 text-[15px] text-dim">
            목록에 없는 업무도 설명해주시면 자동화 가능 여부를 바로 확인해드립니다.
          </p>
        </div>
      </section>

      {/* 6. 작업사례 */}
      <section id="portfolio" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>PORTFOLIO</SectionLabel>
          <h2 className="mx-auto mb-5 text-center text-[32px] font-extrabold tracking-tight md:text-[40px]">
            실무에서 매일 돌아가고 있습니다
          </h2>
          <p className="mx-auto mb-14 max-w-[600px] text-center text-[16px] leading-[1.7] text-muted md:text-[17px]">
            앞의 세 가지는 실제로 만들어 매일 쓰고 있는 자동화이고, 마지막은 같은 방식으로 만들 수 있는 대표
            구성입니다.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {PORTFOLIO_CASES.map((c) => (
              <div
                key={c.title}
                className={`lux-card card-hover flex flex-col gap-4 rounded-2xl p-8 ${c.live ? "!border-[rgba(47,214,255,0.4)]" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[19px] font-extrabold">{c.title}</p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      c.live
                        ? "border border-[rgba(47,214,255,0.45)] bg-[rgba(47,214,255,0.08)] text-cyan"
                        : "border border-[rgba(148,178,255,0.2)] text-dim"
                    }`}
                  >
                    {c.live ? "실운영 중" : "구성 예시"}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-muted">{c.desc}</p>
                <ul className="grid grid-cols-1 gap-1.5 text-[14px] text-soft sm:grid-cols-2">
                  {c.works.map((w) => (
                    <li key={w}>✓ {w}</li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-md bg-well px-2 py-1 text-[12px] font-semibold text-cyan">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 신뢰 */}
      <section id="trust" className="scroll-mt-20 border-t border-line bg-navy2 px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>TRUST</SectionLabel>
          <h2 className="mx-auto mb-5 max-w-[680px] text-center text-[32px] font-extrabold leading-tight tracking-tight md:text-[40px]">
            판매용 데모가 아니라,
            <br />
            직접 쓰려고 만든 자동화입니다
          </h2>
          <p className="mx-auto mb-14 max-w-[600px] text-center text-[16px] leading-[1.7] text-muted md:text-[17px]">
            자동화는 한 번 돌아가는 게 아니라 매일 안 깨지고 돌아가는 게 중요합니다. 실무에서 직접 운영하며 다듬은
            기준으로 만듭니다.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {TRUST_CARDS.map((t) => (
              <div key={t.title} className="lux-card card-hover flex flex-col gap-3 rounded-2xl p-8">
                <p className="text-[18px] font-bold text-accent">{t.title}</p>
                <p className="text-[15px] leading-[1.7] text-muted">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. 작업 과정 */}
      <section id="process" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>작업 과정</SectionLabel>
          <h2 className="mx-auto mb-14 text-center text-[32px] font-extrabold leading-tight tracking-tight md:text-[40px]">
            지금 하시는 일을
            <br />
            설명만 해주시면 됩니다
          </h2>
          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            <div className="absolute left-[8%] right-[8%] top-[17px] hidden h-px bg-[rgba(148,178,255,0.2)] lg:block" />
            {STEPS.map((s, i) => (
              <div key={s.title} className="relative flex flex-col gap-3.5 lg:pr-6">
                <div
                  className={`flex h-[34px] w-[34px] items-center justify-center rounded-full text-[15px] font-extrabold ${
                    i === 0 ? "bg-accent text-navy" : "border border-accent bg-card text-accent"
                  }`}
                >
                  {i + 1}
                </div>
                <p className="text-[17px] font-bold">{s.title}</p>
                <p className="text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. 가격 안내 */}
      <section id="pricing" className="scroll-mt-20 border-t border-line bg-navy2 px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>가격 안내</SectionLabel>
          <h2 className="mx-auto mb-3.5 text-center text-[32px] font-extrabold tracking-tight md:text-[40px]">
            세 가지 구성 중에 고르세요
          </h2>
          <p className="mx-auto mb-14 max-w-[560px] text-center text-[16px] text-muted">
            정확한 금액은 업무 내용과 자동화 범위를 확인한 뒤 안내드립니다.
          </p>
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`lux-card card-hover relative flex flex-col gap-4 rounded-2xl p-8 ${
                  t.recommended ? "!border-accent" : ""
                }`}
              >
                {t.recommended && (
                  <div className="absolute -top-3 left-7 rounded-md bg-cyan px-3 py-1 text-xs font-extrabold text-navy">
                    추천
                  </div>
                )}
                <div>
                  <p className={`mb-1 text-[19px] font-extrabold ${t.recommended ? "text-accent" : ""}`}>{t.name}</p>
                  <p className="text-sm text-muted">{t.tagline}</p>
                </div>
                <p className="text-[32px] font-extrabold tracking-tight">
                  {t.price}
                  {t.price !== "개별 견적" && <span className="text-[15px] font-semibold text-muted">부터</span>}
                </p>
                <ul className="flex flex-1 flex-col gap-2 text-[14.5px] text-soft">
                  {t.features.map((f) => (
                    <li key={f}>— {f}</li>
                  ))}
                </ul>
                <a
                  href={KMONG_URL}
                  className={`block rounded-lg py-3 text-center text-[15px] font-bold ${
                    t.recommended ? "btn-primary text-navy" : "btn-ghost text-ink"
                  }`}
                >
                  문의하기
                </a>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-[600px] text-center text-[15px] leading-[1.7] text-muted">
            자동화 효율이 안 나오는 일이라면,{" "}
            <strong className="font-bold text-soft">만들지 말자고 말씀드립니다.</strong> 필요한 범위부터 현실적으로
            제안드립니다.
          </p>

          <div className="lux-card mt-6 flex flex-col items-start gap-3 rounded-xl !border-[rgba(47,214,255,0.3)] px-7 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <p className="text-[15px] text-soft">
              <strong className="text-cyan">유지보수 구독</strong> — 서식·규칙이 자주 바뀌는 업무라면, 매달 정해진
              비용으로 수정과 관리를 맡기세요.
            </p>
            <a href={KMONG_URL} className="shrink-0 text-sm font-bold text-cyan transition hover:brightness-125">
              구독 문의 →
            </a>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[760px]">
          <SectionLabel center>FAQ</SectionLabel>
          <h2 className="mx-auto mb-12 text-center text-[32px] font-extrabold tracking-tight md:text-[40px]">
            자주 묻는 질문
          </h2>
          <div className="flex flex-col gap-2.5">
            {FAQS.map((f, i) => (
              <div key={i} className="lux-card rounded-xl px-6 py-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 text-left text-[16px] font-bold md:text-[16.5px]"
                  aria-expanded={openFaq === i}
                >
                  {f.q}
                  <span
                    className={`shrink-0 text-cyan transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-[15px] leading-[1.7] text-muted">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. 마지막 CTA */}
      <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-navy2 px-6 py-28 md:px-10 md:py-32">
        <div
          className="pointer-events-none absolute -bottom-56 left-1/2 h-[420px] w-[800px] -translate-x-1/2"
          style={{ background: "radial-gradient(ellipse at center, rgba(76,141,255,0.16), transparent 70%)" }}
        />
        <div className="relative mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
          <h2 className="text-[34px] font-extrabold leading-tight tracking-tighter md:text-[50px]">
            오늘도 반복 작업으로 하루를 보냈다면,
            <br />
            이번 주가 마지막이 되게 해드립니다
          </h2>
          <p className="max-w-[560px] text-[16px] leading-[1.65] text-muted md:text-lg">
            지금 손으로 하고 계신 작업을 그대로 설명해주세요.
            <br className="hidden md:block" /> 자동화 가능 여부와 예상 효과를 먼저 확인해드립니다.
          </p>
          <a
            href={KMONG_URL}
            className="btn-primary mt-1 rounded-xl px-10 py-4 text-lg font-extrabold text-navy"
          >
            크몽 문의하기
          </a>
          <p className="max-w-[480px] text-sm leading-relaxed text-dim">
            자동화 효율이 안 나오는 일이면 솔직하게 말씀드립니다.
            <br />
            부담 없이 지금 업무부터 들려주세요.
          </p>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="flex flex-col gap-2 border-t border-line px-6 py-7 text-[13px] text-dim sm:flex-row sm:justify-between md:px-10">
        <span>© 2026 업무 자동화 프로그램 · <a href="/" className="transition hover:text-soft">ICEBERG</a></span>
        <span>업무 자동화 · 엑셀 자동화 · 한글(HWPX) 문서 자동 생성</span>
      </footer>
    </main>
  );
}
