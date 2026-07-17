"use client";

import { useState } from "react";

// ─────────────────────────────────────────────
// CTA 링크: 크몽 상품 링크가 생기면 여기만 바꾸면 됩니다.
const KMONG_URL = "https://kmong.com/@김주루"; // AI 챗봇 상품 상세 링크가 생기면 그걸로 교체
// ─────────────────────────────────────────────

const PAIN_POINTS = [
  "매일 오는 문의의 절반이 이미 안내한 내용을 다시 묻는 질문이다",
  "밤이나 주말에 온 문의는 다음 날에야 답할 수 있다",
  "홈페이지에 다 적어놨는데도 고객이 찾지 못하고 전화한다",
  "직원마다 답변이 조금씩 달라서 안내가 통일되지 않는다",
];

const HERO_CARDS = [
  { title: "회사 자료로 학습", desc: "홈페이지, 안내문, 매뉴얼, 문서를 학습해 우리 회사 기준으로 답합니다.", highlight: false },
  { title: "출처 인용 답변", desc: "어느 자료의 어떤 내용을 근거로 답했는지 출처를 함께 보여줍니다.", highlight: true },
  { title: "모르면 답하지 않음", desc: "근거가 부족하면 지어내지 않고 담당자 연결로 넘기는 안전장치.", highlight: true },
  { title: "24시간 자동 응대", desc: "밤·주말·휴일에도 같은 품질로 문의에 답합니다.", highlight: false },
];

const SERVICES = [
  { title: "FAQ 챗봇", desc: "자주 묻는 질문·답변을 정리해 웹사이트에서 바로 답하는 기본형 챗봇." },
  { title: "자료 학습 챗봇", desc: "회사 문서·자료 전체를 학습해, 정리돼 있지 않은 질문에도 근거를 찾아 답합니다." },
  { title: "업무 연동 챗봇", desc: "예약 확인, 조회 같은 실제 업무 시스템과 연결되는 맞춤형 챗봇." },
];

const SCOPE_ITEMS = [
  { label: "홈페이지 채팅 위젯 설치" },
  { label: "회사 문서 · 자료 학습(RAG)", highlight: true },
  { label: "출처 인용 답변", highlight: true },
  { label: "미답변 질문 담당자 연결" },
  { label: "관리자 검수 · 답변 관리 화면" },
  { label: "대화 기록 · 통계" },
  { label: "사용량 한도 · 요금 관리" },
  { label: "운영 중 자료 업데이트" },
];

const STEPS = [
  { title: "상담 · 자료 확인", desc: "어떤 문의가 많은지, 어떤 자료가 있는지 확인하고 챗봇의 역할을 정합니다." },
  { title: "범위 · 견적 확정", desc: "기본형·학습형·연동형 중 맞는 구성을 정하고 일정과 견적을 안내드립니다." },
  { title: "구축 · 시연", desc: "챗봇을 만들어 실제 질문으로 함께 테스트하고, 답변 품질을 조정합니다." },
  { title: "적용 · 운영 안내", desc: "홈페이지에 적용하고 관리 방법을 안내합니다. 유지보수 구독도 가능합니다." },
];

const TIERS = [
  {
    name: "FAQ 챗봇",
    tagline: "자주 묻는 질문부터",
    price: "30만원",
    features: ["질문·답변 세트 구성", "홈페이지 채팅 위젯", "미답변 시 연락처 안내", "기본 대화 기록"],
    recommended: false,
  },
  {
    name: "자료 학습 챗봇",
    tagline: "우리 자료로 답하는 챗봇",
    price: "80만원",
    features: ["회사 문서 · 자료 학습(RAG)", "출처 인용 답변", "모르면 답하지 않는 안전장치", "관리자 검수 화면"],
    recommended: true,
  },
  {
    name: "업무 연동 챗봇",
    tagline: "시스템과 연결까지",
    price: "150만원",
    features: ["자료 학습형 전체 포함", "예약 · 조회 등 업무 연동", "사용량 · 통계 대시보드", "운영 정착 지원"],
    recommended: false,
  },
];

const FAQS = [
  {
    q: "어떤 자료가 있어야 하나요?",
    a: "홈페이지 내용, 안내문, 매뉴얼, 엑셀 정리본, 한글·PDF 문서 등 지금 쓰시는 자료면 됩니다. 자료가 흩어져 있어도 정리부터 함께 도와드립니다.",
  },
  {
    q: "챗봇이 틀린 답을 하면 어떡하죠?",
    a: "이 서비스의 핵심입니다. 근거 자료가 없으면 답을 지어내지 않고 '담당자에게 연결'로 넘기도록 만들고, 답변에는 출처를 붙입니다. 관리자 화면에서 답변을 검수하고 고칠 수도 있습니다.",
  },
  {
    q: "월 유지 비용이 있나요?",
    a: "AI 사용료(사용량에 따라 소액)가 발생하며, 구성에 따라 다릅니다. 견적 때 예상 월 비용을 미리 계산해서 안내드리고, 사용량 한도를 걸어 요금이 튀지 않게 만들어드립니다.",
  },
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "FAQ 챗봇은 보통 1주 내외, 자료 학습형은 자료 상태에 따라 2~3주 정도입니다. 자료 확인 후 정확한 일정을 안내드립니다.",
  },
  {
    q: "우리 회사 자료가 외부에 유출되지는 않나요?",
    a: "자료는 챗봇 답변 용도로만 사용하고, 작업 완료 후 요청하시면 사본을 폐기합니다. 민감한 자료는 범위에서 제외하고 진행할 수도 있습니다.",
  },
  {
    q: "만들고 나서 내용이 바뀌면요?",
    a: "가격표·안내문이 바뀌면 자료만 교체하면 됩니다. 직접 하실 수 있게 방법을 안내드리고, 자주 바뀐다면 유지보수 구독으로 맡기실 수도 있습니다.",
  },
  {
    q: "정말 운영해본 적 있는 건가요?",
    a: "네. 교육기관 앱에 교재 기반 AI 튜터 챗봇을 직접 구축해 실서비스로 운영 중입니다. 출처 인용, 미답변 질문 강사 연결, 관리자 검수까지 같은 구조입니다.",
  },
];

const NAV_LINKS = [
  { label: "작업실 홈", href: "/" },
  { label: "원리", href: "#how" },
  { label: "서비스", href: "#services" },
  { label: "작업사례", href: "#portfolio" },
  { label: "진행방식", href: "#process" },
  { label: "가격", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/** 챗봇이 답하는 원리 — 아무것도 몰라도 이해되는 4단계 */
const HOW_FLOW = [
  { step: "질문", desc: "고객이 채팅창에 질문을 입력합니다." },
  { step: "자료에서 근거 찾기", desc: "회사 자료(안내문·매뉴얼·문서) 중에서 질문과 관련된 부분을 먼저 찾아냅니다." },
  { step: "근거로 답변", desc: "AI가 찾아낸 자료를 근거로 답을 만들고, 출처를 함께 보여줍니다." },
  { step: "근거가 없으면", desc: "지어내지 않고 “담당자에게 연결해드릴까요?”로 넘깁니다." },
];

/** 제작 방식 3가지 — 원하는 방식에 따라 제작 가능 */
const BUILD_METHODS = [
  {
    title: "자료 검색 + AI 답변 (RAG)",
    desc: "질문이 올 때마다 회사 자료에서 근거를 찾아 AI가 답하는 방식입니다. 자료만 바꾸면 답변도 바뀌어서, 내용이 자주 바뀌는 곳에 잘 맞습니다.",
    tag: "가장 많이 선택",
    highlight: true,
  },
  {
    title: "완전 자동화",
    desc: "답변만 하는 게 아니라 담당자 연결, 상담 예약, 대화 기록 정리까지 사람 손 없이 흘러가도록 앞뒤 업무까지 묶어서 자동화합니다.",
    tag: "응대 업무 전체",
    highlight: false,
  },
  {
    title: "API 연동 (토큰 방식)",
    desc: "이미 쓰고 있는 홈페이지·앱·시스템이 있다면, API 키(토큰)로 그 안에 챗봇 기능만 붙이는 방식도 가능합니다. 새로 만들 필요가 없습니다.",
    tag: "기존 시스템에 부착",
    highlight: false,
  },
];

const PORTFOLIO_CASES = [
  {
    title: "교재 기반 AI 학습 튜터 (실운영)",
    desc: "학생 질문에 교재·기출 근거를 찾아 출처와 함께 답하는 챗봇. 실서비스 운영 중입니다.",
    works: ["교재 · 기출 자료 학습", "출처 인용 답변", "미답변 질문 강사 연결", "관리자 검수 화면"],
    tags: ["#RAG", "#출처인용", "#실운영"],
    live: true,
  },
  {
    title: "학원 안내 챗봇 (구성 예시)",
    desc: "수강료, 시간표, 등록 절차처럼 반복되는 안내를 챗봇이 대신 응대하는 구성입니다.",
    works: ["수강 안내 자동 응대", "상담 예약 유도", "카카오채널 병행 안내", "자주 묻는 질문 정리"],
    tags: ["#학원", "#상담자동화"],
    live: false,
  },
  {
    title: "쇼핑몰 CS 챗봇 (구성 예시)",
    desc: "배송, 교환·환불 규정, 상품 문의처럼 CS의 대부분을 차지하는 질문을 먼저 받아냅니다.",
    works: ["교환·환불 규정 답변", "배송 안내", "상품 정보 답변", "상담사 연결 분기"],
    tags: ["#쇼핑몰", "#CS자동화"],
    live: false,
  },
  {
    title: "사내 매뉴얼 챗봇 (구성 예시)",
    desc: "규정집·업무 매뉴얼을 학습해 직원들이 찾아 헤매지 않고 바로 묻는 사내용 챗봇입니다.",
    works: ["규정 · 매뉴얼 학습", "부서별 자료 구분", "출처 페이지 표시", "권한 관리"],
    tags: ["#사내챗봇", "#매뉴얼"],
    live: false,
  },
];

const TRUST_CARDS = [
  {
    title: "실서비스로 운영해본 챗봇",
    desc: "데모로 끝나는 챗봇이 아니라, 실제 사용자들이 매일 쓰는 챗봇을 만들어 운영해봤습니다. 운영에서 생기는 문제(틀린 답, 요금, 관리)를 미리 설계에 넣습니다.",
  },
  {
    title: "'모르면 답하지 않는' 설계",
    desc: "AI 챗봇의 최대 리스크는 그럴듯한 거짓말입니다. 근거가 부족하면 답하지 않고 담당자에게 넘기는 구조를 기본으로 만듭니다.",
  },
  {
    title: "만들고 끝이 아닌 관리 화면",
    desc: "어떤 질문이 들어왔고 뭐라고 답했는지 관리자가 검수할 수 있는 화면까지 함께 드립니다. 챗봇은 만든 뒤 관리가 반입니다.",
  },
  {
    title: "요금이 튀지 않는 구조",
    desc: "AI 사용료가 얼마나 나올지 미리 계산해 안내하고, 사용량 한도를 걸어 예상 밖의 요금이 나오지 않게 만듭니다.",
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
            <span className="hidden text-[15px] font-bold text-soft sm:block">맞춤형 AI 챗봇 구축</span>
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
            학원 · 쇼핑몰 · 병원 · 소상공인 · 사내용 — 실서비스 운영 경험으로 만드는 챗봇
          </div>
          <h1 className="text-[40px] font-extrabold leading-[1.14] tracking-tighter md:text-[64px] lg:text-[72px]">
            같은 질문에 매일 답하지 마세요.
            <br />
            <span className="text-accent">우리 자료로 답하는 챗봇을 드립니다.</span>
          </h1>
          <p className="max-w-[640px] text-[17px] leading-relaxed text-muted md:text-xl">
            회사 자료를 학습해 출처와 함께 답하고, 모르면 지어내지 않고 담당자에게 넘깁니다.
            <br className="hidden md:block" /> 지금 반복되는 문의 내용만 보내주시면 상담을 시작할 수 있습니다.
          </p>
          <div className="mt-1 flex flex-col gap-3.5 sm:flex-row">
            <CtaButton>크몽 문의하기</CtaButton>
            <a href="#pricing" className="btn-ghost rounded-xl px-8 py-4 text-[17px] font-semibold text-ink">
              가격 안내
            </a>
          </div>
        </div>

        {/* 4대 특징 카드 */}
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

        {/* 채팅 mockup */}
        <div className="relative mx-auto mt-20 max-w-[640px]">
          <div
            className="pointer-events-none absolute -inset-10"
            style={{ background: "radial-gradient(ellipse at center, rgba(76,141,255,0.12), transparent 70%)" }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(148,178,255,0.18)] bg-card text-left shadow-[0_40px_80px_rgba(0,0,0,0.55)]">
            {/* 채팅 헤더 */}
            <div className="flex items-center gap-3 border-b border-line bg-[#0D1220] px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-[13px] font-extrabold text-navy">
                AI
              </div>
              <div>
                <p className="text-[14px] font-bold leading-none">우리회사 안내 챗봇</p>
                <p className="mt-1 text-[11px] leading-none text-cyan">● 24시간 응답 중</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-5 md:p-7">
              {/* 고객 질문 */}
              <div className="self-end rounded-2xl rounded-br-md bg-accent px-4 py-3 text-[14px] font-semibold text-navy">
                환불 규정이 어떻게 되나요?
              </div>
              {/* 챗봇 답변 — 출처 포함 */}
              <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md border border-[rgba(148,178,255,0.15)] bg-well px-4 py-3.5">
                <p className="text-[14px] leading-relaxed text-soft">
                  수강 시작 전에는 전액 환불되며, 시작 후에는 이용 일수를 제외하고 환불됩니다. 자세한 기준은 아래
                  출처를 확인해주세요.
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-md border border-[rgba(47,214,255,0.35)] bg-[rgba(47,214,255,0.07)] px-2 py-1 text-[11px] font-bold text-cyan">
                  출처 · 이용약관 제9조 환불 규정
                </div>
              </div>
              {/* 모르는 질문 → 담당자 연결 */}
              <div className="self-end rounded-2xl rounded-br-md bg-accent px-4 py-3 text-[14px] font-semibold text-navy">
                다음 달에 지점 새로 생기나요?
              </div>
              <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md border border-[rgba(148,178,255,0.15)] bg-well px-4 py-3.5">
                <p className="text-[14px] leading-relaxed text-soft">
                  해당 내용은 제가 가진 자료에 없어 정확히 답변드리기 어렵습니다. 담당자에게 바로
                  연결해드릴까요?
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-md border border-line bg-[#0D1220] px-2 py-1 text-[11px] font-bold text-dim">
                  지어내지 않고 담당자 연결
                </div>
              </div>
            </div>
          </div>

          {/* 라벨 */}
          <div className="absolute -right-2 top-[110px] hidden md:block lg:-right-24">
            <span className="whitespace-nowrap rounded-lg border border-[rgba(47,214,255,0.5)] bg-[#0C1A2B] px-3.5 py-2 text-[13px] font-bold text-cyan shadow-lg">
              출처 인용
            </span>
          </div>
          <div className="absolute -left-2 bottom-[70px] hidden md:block lg:-left-28">
            <span className="whitespace-nowrap rounded-lg border border-[rgba(47,214,255,0.5)] bg-[#0C1A2B] px-3.5 py-2 text-[13px] font-bold text-cyan shadow-lg">
              모르면 답 안 함
            </span>
          </div>
        </div>
      </section>

      {/* 3. 문제 공감 */}
      <section className="border-t border-line bg-navy2 px-6 py-24 md:px-10 md:py-28">
        <p className="mx-auto mb-16 max-w-[640px] text-center text-[17px] leading-[1.75] text-muted md:text-[19px]">
          문의에 답하는 시간도 비용입니다.
          <br />
          <strong className="font-bold text-ink">그리고 그 문의의 대부분은 매번 비슷한 질문입니다.</strong>
        </p>
        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-10 md:grid-cols-[360px_1fr] md:gap-16">
          <div>
            <SectionLabel>이런 상황이라면</SectionLabel>
            <h2 className="text-[32px] font-extrabold leading-tight tracking-tight md:text-[40px]">
              문의 응대 때문에
              <br />
              일이 끊기고 있진 않나요?
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

      {/* 3.5 원리 — 아무것도 몰라도 이해되는 설명 */}
      <section id="how" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>어떻게 답하나요?</SectionLabel>
          <h2 className="mx-auto mb-5 max-w-[640px] text-center text-[32px] font-extrabold leading-tight tracking-tight md:text-[40px]">
            원리는 간단합니다.
            <br />
            찾고, 근거로 답합니다.
          </h2>
          <p className="mx-auto mb-14 max-w-[600px] text-center text-[16px] leading-[1.7] text-muted md:text-[17px]">
            어려운 용어를 몰라도 괜찮습니다. 챗봇이 답하는 과정은 아래 네 단계가 전부입니다.
          </p>

          {/* 4단계 흐름 */}
          <div className="relative mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {HOW_FLOW.map((f, i) => (
              <div key={f.step} className="lux-card relative flex flex-col gap-2.5 rounded-2xl p-6">
                <span className="text-[13px] font-extrabold text-cyan">STEP {i + 1}</span>
                <p className="text-[17px] font-extrabold">{f.step}</p>
                <p className="text-[14px] leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* 제작 방식 3가지 */}
          <div className="mb-3 text-center">
            <p className="text-[15px] font-bold text-cyan">원하는 방식에 따라 제작 가능합니다</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {BUILD_METHODS.map((m) => (
              <div
                key={m.title}
                className={`lux-card card-hover flex flex-col gap-3 rounded-2xl p-7 ${m.highlight ? "!border-[rgba(47,214,255,0.4)]" : ""}`}
              >
                <span
                  className={`self-start rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    m.highlight
                      ? "border border-[rgba(47,214,255,0.45)] bg-[rgba(47,214,255,0.08)] text-cyan"
                      : "border border-[rgba(148,178,255,0.2)] text-dim"
                  }`}
                >
                  {m.tag}
                </span>
                <p className={`text-[18px] font-extrabold ${m.highlight ? "text-cyan" : ""}`}>{m.title}</p>
                <p className="text-[14.5px] leading-[1.7] text-muted">{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[560px] text-center text-[15px] leading-[1.7] text-soft">
            어떤 방식이 맞는지 몰라도 괜찮습니다.
            <br />
            <strong className="font-bold text-ink">지금 상황만 말씀해주시면, 맞는 방식을 골라서 안내드립니다.</strong>
          </p>
        </div>
      </section>

      {/* 4. 서비스 소개 */}
      <section className="border-t border-line px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>서비스 소개</SectionLabel>
          <h2 className="mx-auto mb-5 max-w-[680px] text-center text-[32px] font-extrabold leading-tight tracking-tight md:text-[40px]">
            챗봇은 아무 말이나 하면
            <br />
            오히려 신뢰를 깎아 먹습니다.
          </h2>
          <p className="mx-auto mb-14 max-w-[600px] text-center text-[16px] leading-[1.7] text-muted md:text-[17px]">
            그래서 이 서비스는 &lsquo;그럴듯하게 말하는 챗봇&rsquo;이 아니라, 우리 자료를 근거로 답하고 모르면 답하지
            않는 챗봇을 만듭니다. 필요한 수준에 맞는 구성을 고르시면 됩니다.
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
          <SectionLabel>포함되는 것들</SectionLabel>
          <h2 className="mb-11 text-[32px] font-extrabold tracking-tight md:text-[40px]">이런 것까지 만들어드립니다</h2>
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
            카카오채널 연동, 사내 시스템 연결 등 목록에 없는 구성도 상담 시 가능 여부를 확인해드립니다.
          </p>
        </div>
      </section>

      {/* 6. 작업사례 */}
      <section id="portfolio" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>PORTFOLIO</SectionLabel>
          <h2 className="mx-auto mb-5 text-center text-[32px] font-extrabold tracking-tight md:text-[40px]">
            실서비스로 운영해봤습니다
          </h2>
          <p className="mx-auto mb-14 max-w-[600px] text-center text-[16px] leading-[1.7] text-muted md:text-[17px]">
            첫 번째 카드는 실제로 만들어 운영 중인 챗봇이고, 나머지는 같은 구조로 만들 수 있는 대표 구성입니다.
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
            챗봇을 &lsquo;만들어본&rsquo; 것과
            <br />
            &lsquo;운영해본&rsquo; 것은 다릅니다
          </h2>
          <p className="mx-auto mb-14 max-w-[600px] text-center text-[16px] leading-[1.7] text-muted md:text-[17px]">
            챗봇의 진짜 문제는 오픈 다음 날부터 시작됩니다. 틀린 답, 예상 밖의 질문, AI 요금, 자료 업데이트 —
            실서비스 운영에서 겪은 문제들을 처음부터 설계에 넣습니다.
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
            지금 반복되는 문의 내용부터
            <br />
            보내주시면 됩니다
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
            정확한 금액은 자료 상태와 원하는 기능을 확인한 뒤 안내드립니다. AI 사용료(월)는 견적 때 함께 계산해드립니다.
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
                  <span className="text-[15px] font-semibold text-muted">부터</span>
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
            지금 상황에 챗봇이 필요 없다고 판단되면,{" "}
            <strong className="font-bold text-soft">그렇게 말씀드립니다.</strong> 필요한 범위부터 현실적으로
            제안드립니다.
          </p>

          <div className="lux-card mt-6 flex flex-col items-start gap-3 rounded-xl !border-[rgba(47,214,255,0.3)] px-7 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <p className="text-[15px] text-soft">
              <strong className="text-cyan">운영 유지보수 구독</strong> — 자료 업데이트, 답변 검수, 요금 관리를 매달
              정해진 비용으로 맡기세요.
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
            오늘도 같은 질문에 답하고 계셨다면,
            <br />
            이제 챗봇에게 맡겨보세요
          </h2>
          <p className="max-w-[560px] text-[16px] leading-[1.65] text-muted md:text-lg">
            자주 오는 문의 내용과 가지고 있는 자료를 보내주시면,
            <br className="hidden md:block" /> 어떤 구성이 맞는지 먼저 확인해드립니다.
          </p>
          <a
            href={KMONG_URL}
            className="btn-primary mt-1 rounded-xl px-10 py-4 text-lg font-extrabold text-navy"
          >
            크몽 문의하기
          </a>
          <p className="max-w-[480px] text-sm leading-relaxed text-dim">
            챗봇이 필요 없는 상황이라면 필요 없다고 말씀드립니다.
            <br />
            부담 없이 현재 상황부터 들려주세요.
          </p>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="flex flex-col gap-2 border-t border-line px-6 py-7 text-[13px] text-dim sm:flex-row sm:justify-between md:px-10">
        <span>© 2026 맞춤형 AI 챗봇 구축 · <a href="/" className="transition hover:text-soft">ICEBERG</a></span>
        <span>AI 챗봇 제작 · RAG 챗봇 · 문의 자동 응대</span>
      </footer>
    </main>
  );
}
