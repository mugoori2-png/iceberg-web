"use client";

import { useState } from "react";

// ─────────────────────────────────────────────
// CTA 링크: 크몽 상품 링크가 생기면 여기만 바꾸면 됩니다.
const KMONG_URL = "https://kmong.com/gig/789321"; // 수정 클리닉 상품 상세 링크가 생기면 그걸로 교체
// ─────────────────────────────────────────────

const PAIN_POINTS = [
  "만들어둔 홈페이지의 연락처나 문구 하나 바꾸고 싶다",
  "버튼 하나 바꾸려는데 어디서 수정해야 하는지 모르겠다",
  "모바일에서 화면이 깨지는데 일단 그대로 두고 있다",
  "방문자는 있는데 문의 전화나 상담 요청은 오지 않는다",
];

const HERO_CARDS = [
  { title: "문구 · 버튼 수정", desc: "잘못된 문구, 버튼 이름, 링크 연결을 바로잡습니다.", highlight: false },
  { title: "텍스트 정리", desc: "어색한 소개문, 오타, 오래된 안내문을 자연스럽게 수정합니다.", highlight: false },
  { title: "이미지 교체", desc: "사진, 배너, 로고를 새 자료로 깔끔하게 교체합니다.", highlight: false },
  { title: "모바일 깨짐 해결", desc: "휴대폰에서 밀리거나 잘리는 화면을 보기 좋게 정리합니다.", highlight: true },
];

const SERVICES = [
  { title: "단건 수정", desc: "문구, 이미지, 버튼처럼 작은 것 하나만 바꿔도 됩니다." },
  { title: "페이지 리뉴얼", desc: "여러 구간을 정리하고 레이아웃을 다듬어 더 보기 좋게 만듭니다." },
  { title: "랜딩페이지 개선", desc: "문구 흐름과 버튼 배치를 개선해 방문자가 문의하기 쉽게 만듭니다." },
];

const SCOPE_ITEMS = [
  { label: "홈페이지 텍스트 수정" },
  { label: "이미지 교체" },
  { label: "버튼 · 링크 수정" },
  { label: "모바일 반응형 오류 수정", highlight: true },
  { label: "섹션 추가 · 삭제" },
  { label: "랜딩페이지 흐름 개선", highlight: true },
  { label: "간단한 디자인 정리" },
  { label: "유지보수 월 구독" },
];

const STEPS = [
  { title: "문의 · 요청 정리", desc: "고치고 싶은 곳의 화면 캡처나 링크를 보내주시면 요청을 정리합니다." },
  { title: "견적 · 일정 안내", desc: "작업 범위와 예상 일정을 확인한 뒤 견적을 안내드립니다." },
  { title: "수정 작업", desc: "캡처한 화면과 요청사항을 기준으로 필요한 부분을 수정합니다." },
  { title: "확인 · 마무리", desc: "수정된 화면을 함께 확인하고 사전에 합의한 범위에서 보완합니다." },
];

const TIERS = [
  {
    name: "간단 수정",
    tagline: "크몽 상품 상세 범위 기준",
    price: "5,000원부터",
    features: ["텍스트 수정", "이미지 교체", "버튼 · 링크 수정", "오타 · 문구 변경"],
    recommended: false,
  },
  {
    name: "여러 구간 수정",
    tagline: "페이지 곳곳을 한 번에",
    price: "개별 견적",
    features: ["여러 구간 수정", "모바일 화면 점검", "간단한 레이아웃 정리", "이미지 · 버튼 배치 개선"],
    recommended: true,
  },
  {
    name: "랜딩페이지 정리",
    tagline: "문의가 오는 페이지로",
    price: "개별 견적",
    features: ["문구 흐름 정리", "CTA 버튼 개선", "Before/After 구조 개선", "문의 유도 흐름 정리"],
    recommended: false,
  },
];

const FAQS = [
  {
    q: "다른 업체가 만든 홈페이지도 수정 가능한가요?",
    a: "가능한 경우가 많습니다. 다만 사이트 제작 방식과 접근 권한에 따라 달라질 수 있어 먼저 확인 후 안내드립니다.",
  },
  {
    q: "어떤 종류의 페이지까지 가능한가요?",
    a: "일반 홈페이지, 랜딩페이지, 학원 소개 페이지, 서비스 소개 페이지, 이벤트 페이지 등 기본적인 웹페이지 수정을 도와드립니다.",
  },
  {
    q: "기간은 얼마나 걸리나요?",
    a: "간단한 수정은 빠르면 당일 또는 1~2일 내 가능하며, 작업 범위가 넓은 경우 일정 안내 후 진행합니다.",
  },
  {
    q: "수정 후 문제가 생기면요?",
    a: "작업 완료 후 확인 과정에서 필요한 부분은 보완해드립니다. 세부 보완 범위는 작업 전 안내드립니다.",
  },
  {
    q: "컴퓨터를 잘 몰라도 되나요?",
    a: "괜찮습니다. 수정이 필요한 화면을 캡처해서 보내주시면 어떤 부분을 고치면 되는지 함께 정리해드립니다.",
  },
  {
    q: "관리자 계정이 없어도 가능한가요?",
    a: "작업 방식에 따라 다릅니다. 관리자 계정, 호스팅 정보, 코드 접근 권한 등이 필요한 경우가 있어 먼저 현재 상황을 확인합니다.",
  },
  {
    q: "카페24, 아임웹, 워드프레스, 직접 만든 사이트도 가능한가요?",
    a: "사이트 제작 방식에 따라 가능 여부가 달라질 수 있습니다. 먼저 링크와 수정 요청 내용을 보내주시면 확인 후 안내드립니다.",
  },
];

const NAV_LINKS = [
  { label: "작업실 홈", href: "/" },
  { label: "서비스", href: "#services" },
  { label: "작업사례", href: "#portfolio" },
  { label: "운영경험", href: "#trust" },
  { label: "진행방식", href: "#process" },
  { label: "가격", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const PORTFOLIO_CASES = [
  {
    title: "학원 홈페이지 수정",
    desc: "오래된 안내 문구, 버튼 링크, 모바일 화면을 정리했습니다.",
    works: ["안내 문구 수정", "버튼 링크 변경", "모바일 화면 점검", "이미지 배치 정리"],
    tags: ["#문구수정", "#버튼수정", "#모바일점검"],
  },
  {
    title: "서비스 소개 페이지 개선",
    desc: "첫 화면 문구와 CTA 버튼을 정리해 문의 흐름을 분명하게 만들었습니다.",
    works: ["첫 화면 카피 정리", "문의 버튼 강조", "섹션 순서 재배치", "불필요한 문구 삭제"],
    tags: ["#카피정리", "#CTA개선", "#섹션정리"],
  },
  {
    title: "랜딩페이지 구조 정리",
    desc: "흩어진 정보를 문제 → 해결 → 가격 → 문의 흐름으로 재배치했습니다.",
    works: ["문제 공감 섹션 추가", "가격 안내 정리", "FAQ 구성", "마지막 CTA 추가"],
    tags: ["#랜딩페이지정리", "#가격안내", "#FAQ구성"],
  },
  {
    title: "관리자/내부 페이지 UI 정리",
    desc: "표, 버튼, 메뉴 구조를 보기 쉽게 정리해 사용성을 개선했습니다.",
    works: ["메뉴 구조 정리", "버튼 위치 개선", "표 가독성 개선", "모바일·태블릿 화면 점검"],
    tags: ["#UI정리", "#가독성개선", "#반응형점검"],
  },
];

const TRUST_CARDS = [
  {
    title: "실제 홈페이지 운영 경험",
    desc: "학원 홈페이지와 서비스 페이지를 직접 운영하며, 단순 디자인보다 실제 문의와 사용 흐름이 중요하다는 점을 기준으로 봅니다.",
  },
  {
    title: "내부 관리 페이지 제작 경험",
    desc: "관리자 페이지, 업무용 화면, 데이터 입력 화면 등 실제로 사용하는 웹페이지의 구조와 가독성을 다뤄본 경험이 있습니다.",
  },
  {
    title: "필요한 범위만 현실적으로 수정",
    desc: "무조건 전체 리뉴얼을 권하지 않고, 현재 페이지에서 살릴 부분과 고칠 부분을 나누어 안내합니다.",
  },
  {
    title: "고객이 이해하는 쉬운 설명",
    desc: "개발 용어를 어렵게 설명하지 않고, 무엇을 고치면 되는지 화면 기준으로 쉽게 안내합니다.",
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
            <span className="hidden text-[15px] font-bold text-soft sm:block">홈페이지 수정 클리닉</span>
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
            소상공인 · 학원 · 강사 · 1인 사업자를 위한 웹페이지 수정 서비스
          </div>
          <h1 className="text-[40px] font-extrabold leading-[1.14] tracking-tighter md:text-[64px] lg:text-[72px]">
            홈페이지, 새로 만들지 마세요.
            <br />
            <span className="text-accent">필요한 곳만 고쳐드립니다.</span>
          </h1>
          <p className="max-w-[600px] text-[17px] leading-relaxed text-muted md:text-xl">
            텍스트 수정, 이미지 교체, 버튼 링크 변경, 모바일 깨짐까지 빠르게 정리해드립니다.
            <br className="hidden md:block" /> 화면 캡처 한 장이면 상담을 시작할 수 있습니다.
          </p>
          <div className="mt-1 flex flex-col gap-3.5 sm:flex-row">
            <CtaButton>크몽 문의하기</CtaButton>
            <a href="#pricing" className="btn-ghost rounded-xl px-8 py-4 text-[17px] font-semibold text-ink">
              가격 안내
            </a>
          </div>
        </div>

        {/* 4대 서비스 카드 */}
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

        {/* 브라우저 mockup */}
        <div className="relative mx-auto mt-20 max-w-[880px]">
          {/* mockup 뒤 글로우 */}
          <div
            className="pointer-events-none absolute -inset-10"
            style={{ background: "radial-gradient(ellipse at center, rgba(76,141,255,0.12), transparent 70%)" }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(148,178,255,0.18)] bg-card shadow-[0_40px_80px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-2 border-b border-line bg-[#0D1220] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-bar3" />
              <span className="h-2.5 w-2.5 rounded-full bg-bar3" />
              <span className="h-2.5 w-2.5 rounded-full bg-bar3" />
              <div className="ml-3 max-w-[320px] flex-1 rounded-md bg-well px-3 py-1 text-left text-xs text-dim">
                mybusiness.co.kr
              </div>
            </div>
            <div className="p-6 text-left md:px-9 md:pb-9 md:pt-7">
              {/* mock nav */}
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-extrabold tracking-[0.2em] text-soft">LOGO</span>
                <div className="flex items-center gap-3">
                  <div className="hidden h-2 w-10 rounded bg-bar2 sm:block" />
                  <div className="hidden h-2 w-10 rounded bg-bar2 sm:block" />
                  <div className="hidden h-2 w-10 rounded bg-bar2 sm:block" />
                  <div className="h-[22px] w-[64px] rounded-md bg-accent" />
                </div>
              </div>
              {/* mock hero — 문구 수정 타깃 */}
              <div className="relative mb-3 inline-block rounded-lg border border-dashed border-[rgba(47,214,255,0.45)] px-3 py-2">
                <p className="text-[22px] font-extrabold leading-snug tracking-tight text-ink md:text-[26px]">
                  비즈니스의 가치를
                  <br />더 크게 만드는 방법
                </p>
                <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-cyan" />
              </div>
              <p className="mb-4 text-[13px] leading-relaxed text-muted">
                고객의 문제를 해결하고,
                <br />더 나은 경험을 제공하는 서비스
              </p>
              {/* mock CTA — 버튼 교체 타깃 */}
              <div className="relative inline-flex">
                <span className="whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-[13px] font-bold text-navy shadow-[0_4px_20px_rgba(76,141,255,0.4)]">
                  자세히 보기
                </span>
                <span className="absolute -left-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-cyan" />
              </div>
              {/* mock feature cards */}
              <div className="mt-7 grid grid-cols-3 gap-3.5">
                {["서비스 소개", "핵심 기능", "고객 후기"].map((label) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2.5 rounded-xl border border-[rgba(148,178,255,0.1)] bg-well px-3 py-5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(148,178,255,0.25)]">
                      <div className="h-3 w-3 rounded-sm border-2 border-soft" />
                    </div>
                    <span className="whitespace-nowrap text-[12px] font-semibold text-soft">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 모바일 mockup — 모바일 점검 타깃 */}
          <div className="absolute -bottom-10 -right-3 hidden w-[170px] overflow-hidden rounded-[20px] border border-[rgba(47,214,255,0.45)] bg-card shadow-[0_30px_70px_rgba(0,0,0,0.6)] md:block lg:-right-16">
            <div className="flex items-center justify-between border-b border-line bg-[#0D1220] px-3 py-2">
              <span className="text-[9px] text-dim">mybusiness.co.kr</span>
              <span className="h-2 w-2 rounded-full border border-dim" />
            </div>
            <div className="p-3 text-left">
              <p className="mb-1.5 text-[9px] font-extrabold tracking-[0.2em] text-soft">LOGO</p>
              <p className="text-[12px] font-extrabold leading-snug text-ink">
                비즈니스의 가치를
                <br />더 크게 만드는 방법
              </p>
              <p className="mt-1 text-[8px] leading-relaxed text-dim">
                고객의 문제를 해결하고,
                <br />더 나은 경험을 제공하는 서비스
              </p>
              <span className="mt-2 inline-block rounded bg-accent px-2 py-1 text-[8px] font-bold text-navy">자세히 보기</span>
              <div className="mt-2.5 flex flex-col gap-1.5">
                {["서비스 소개", "핵심 기능", "고객 후기"].map((label) => (
                  <div key={label} className="flex items-center gap-1.5 rounded-md bg-well px-2 py-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm border border-soft" />
                    <span className="whitespace-nowrap text-[9px] font-semibold text-soft">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 라벨 */}
          <div className="absolute right-2 top-[72px] flex items-center gap-0 md:-right-8">
            <span className="whitespace-nowrap rounded-lg border border-[rgba(47,214,255,0.5)] bg-[#0C1A2B] px-3.5 py-2 text-[13px] font-bold text-cyan shadow-lg">
              문구 수정
            </span>
          </div>
          <div className="absolute left-2 top-[280px] flex items-center gap-0 md:-left-9">
            <span className="whitespace-nowrap rounded-lg border border-[rgba(47,214,255,0.5)] bg-[#0C1A2B] px-3.5 py-2 text-[13px] font-bold text-cyan shadow-lg">
              버튼 교체
            </span>
          </div>
          <div className="absolute -bottom-14 right-6 hidden whitespace-nowrap rounded-lg border border-[rgba(47,214,255,0.5)] bg-[#0C1A2B] px-3.5 py-2 text-[13px] font-bold text-cyan shadow-lg md:block lg:-right-4">
            모바일 점검
          </div>
          <div className="absolute bottom-6 right-2 whitespace-nowrap rounded-lg border border-[rgba(47,214,255,0.5)] bg-[#0C1A2B] px-3.5 py-2 text-[13px] font-bold text-cyan shadow-lg md:hidden">
            모바일 점검
          </div>
        </div>
      </section>

      {/* 3. 문제 공감 */}
      <section className="border-t border-line bg-navy2 px-6 py-24 md:px-10 md:py-28">
        <p className="mx-auto mb-16 max-w-[640px] text-center text-[17px] leading-[1.75] text-muted md:text-[19px]">
          요즘은 클릭 몇 번이면 홈페이지를 만들 수 있다고 합니다.
          <br />
          <strong className="font-bold text-ink">하지만 막상 만들어보면, 진짜 고민은 그다음부터 시작됩니다.</strong>
        </p>
        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-10 md:grid-cols-[360px_1fr] md:gap-16">
          <div>
            <SectionLabel>이런 상황이라면</SectionLabel>
            <h2 className="text-[32px] font-extrabold leading-tight tracking-tight md:text-[40px]">
              홈페이지 때문에
              <br />
              답답했던 적, 있으시죠?
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
          <h2 className="mx-auto mb-5 max-w-[640px] text-center text-[32px] font-extrabold leading-tight tracking-tight md:text-[40px]">
            새로 만드는 것보다,
            <br />
            고쳐 쓰는 게 더 나을 때가 많습니다.
          </h2>
          <p className="mx-auto mb-14 max-w-[560px] text-center text-[16px] leading-[1.7] text-muted md:text-[17px]">
            무조건 전체 제작을 권하지 않습니다. 현재 페이지에서 살릴 부분은 살리고, 문제가 되는 부분만 현실적으로 수정합니다.
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
          <h2 className="mb-11 text-[32px] font-extrabold tracking-tight md:text-[40px]">이런 요청을 처리합니다</h2>
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
            목록에 없는 작업도 화면을 보내주시면 가능 여부를 바로 확인해드립니다.
          </p>
        </div>
      </section>

      {/* 6. Before / After */}
      <section className="border-t border-line px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>BEFORE → AFTER</SectionLabel>
          <h2 className="mx-auto mb-14 text-center text-[32px] font-extrabold tracking-tight md:text-[40px]">
            같은 페이지가 이렇게 달라집니다
          </h2>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_56px_1fr] md:gap-0">
            {/* BEFORE */}
            <div className="overflow-hidden rounded-xl border border-line bg-panel p-6 grayscale-[30%]">
              <span className="mb-4 inline-block rounded-full border border-[rgba(148,178,255,0.2)] bg-well px-3 py-1 text-[12px] font-extrabold tracking-widest text-dim">
                BEFORE · 정리 전
              </span>
              <div className="overflow-hidden rounded-lg border border-[rgba(148,178,255,0.1)] bg-[#0A0E18]">
                <div className="border-b border-line bg-well/50 px-2.5 py-1.5">
                  <span className="text-[9px] text-dim">mybusiness.co.kr</span>
                </div>
                <div className="p-3.5 opacity-70">
                  <div className="mb-2.5 truncate rounded bg-bar2 px-2 py-1 text-[10px] font-bold text-dim">
                    홈페이지최종수정_v2_진짜최종 — 안내문 수정 요망
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-[9px] w-[96%] rounded bg-bar3" />
                    <div className="h-[9px] w-[102%] rounded bg-bar3" />
                    <div className="h-[9px] w-[88%] rounded bg-bar3" />
                    <div className="ml-4 h-[9px] w-[80%] rounded bg-bar3" />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <div className="h-6 flex-1 rounded bg-bar2" />
                    <div className="h-6 flex-1 rounded bg-bar2" />
                    <div className="h-6 flex-1 rounded bg-bar2" />
                  </div>
                  <div className="mt-3 flex h-7 items-center justify-center rounded bg-bar2 text-[10px] font-semibold text-dim">
                    자세히 보기
                  </div>
                </div>
              </div>
              <ul className="mt-5 flex flex-col gap-2.5 text-[13.5px] text-dim">
                <li className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-well text-[10px] font-bold">✕</span>
                  무슨 서비스인지 바로 안 보임
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-well text-[10px] font-bold">✕</span>
                  오래된 문구와 어색한 이미지
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-well text-[10px] font-bold">✕</span>
                  모바일에서 밀리거나 잘림
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-well text-[10px] font-bold">✕</span>
                  문의 버튼이 눈에 띄지 않음
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center text-[22px] font-extrabold text-cyan md:rotate-0">
              <span className="rotate-90 md:rotate-0">→</span>
            </div>
            {/* AFTER */}
            <div className="relative rounded-xl border border-accent bg-gradient-to-b from-card2 to-card p-6 shadow-[0_0_70px_rgba(76,141,255,0.18)]">
              <div
                className="pointer-events-none absolute -inset-px rounded-xl"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(47,214,255,0.1), transparent 60%)" }}
              />
              <span className="relative mb-4 inline-block rounded-full border border-[rgba(47,214,255,0.45)] bg-[rgba(47,214,255,0.08)] px-3 py-1 text-[12px] font-extrabold tracking-widest text-cyan">
                AFTER · 정리 후
              </span>
              <div className="relative overflow-hidden rounded-lg border border-[rgba(76,141,255,0.35)] bg-[#0C1322]">
                <div className="flex items-center justify-between border-b border-line bg-well/50 px-2.5 py-1.5">
                  <span className="text-[9px] text-dim">mybusiness.co.kr</span>
                  <span className="h-1.5 w-6 rounded-full bg-accent" />
                </div>
                <div className="p-3.5">
                  <p className="mb-1 text-[9px] font-extrabold tracking-[0.2em] text-soft">LOGO</p>
                  <p className="text-[15px] font-extrabold leading-snug text-ink">
                    비즈니스의 가치를
                    <br />더 크게 만드는 방법
                  </p>
                  <p className="mt-1 text-[9px] leading-relaxed text-dim">고객의 문제를 해결하고, 더 나은 경험을 제공하는 서비스</p>
                  <div className="mt-2.5 flex items-end justify-between gap-2">
                    <span className="shrink-0 rounded-md bg-accent px-2.5 py-1.5 text-[10px] font-bold text-navy shadow-[0_3px_12px_rgba(76,141,255,0.45)]">
                      문의하기
                    </span>
                    <div className="flex gap-1.5">
                      {["서비스 소개", "핵심 기능", "고객 후기"].map((label) => (
                        <div key={label} className="flex flex-col items-center gap-1 rounded-md bg-well px-2 py-1.5">
                          <span className="h-2 w-2 rounded-sm border border-soft" />
                          <span className="whitespace-nowrap text-[8px] font-semibold text-soft">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <ul className="relative mt-5 flex flex-col gap-2.5 text-[13.5px] text-[#A9E8F8]">
                <li className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-navy">✓</span>
                  첫 화면에서 서비스가 바로 이해됨
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-navy">✓</span>
                  문구와 이미지가 정리됨
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-navy">✓</span>
                  모바일에서도 깔끔하게 보임
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-navy">✓</span>
                  문의 버튼이 잘 보임
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 작업사례 */}
      <section id="portfolio" className="scroll-mt-20 border-t border-line bg-navy2 px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>PORTFOLIO</SectionLabel>
          <h2 className="mx-auto mb-5 text-center text-[32px] font-extrabold tracking-tight md:text-[40px]">
            이런 페이지를 정리해왔습니다
          </h2>
          <p className="mx-auto mb-14 max-w-[560px] text-center text-[16px] leading-[1.7] text-muted md:text-[17px]">
            처음부터 새로 만드는 것이 아니라, 이미 있는 페이지에서 필요한 부분을 정리하고 개선하는 작업을 중심으로
            진행합니다.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {PORTFOLIO_CASES.map((c) => (
              <div key={c.title} className="lux-card card-hover flex flex-col gap-4 rounded-2xl p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[19px] font-extrabold">{c.title}</p>
                  <span className="shrink-0 rounded-full border border-[rgba(148,178,255,0.2)] px-2.5 py-1 text-[11px] font-bold text-dim">
                    작업 예시
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
          <p className="mt-8 text-center text-[13px] text-dim">
            실제 작업 후기는 크몽 서비스 오픈 후 순차적으로 업데이트됩니다.
          </p>
        </div>
      </section>

      {/* 8. 운영경험 / 신뢰 */}
      <section id="trust" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>TRUST</SectionLabel>
          <h2 className="mx-auto mb-5 max-w-[680px] text-center text-[32px] font-extrabold leading-tight tracking-tight md:text-[40px]">
            단순 수정이 아니라,
            <br />
            실제로 쓰이는 페이지 기준으로 봅니다
          </h2>
          <p className="mx-auto mb-14 max-w-[600px] text-center text-[16px] leading-[1.7] text-muted md:text-[17px]">
            홈페이지는 예쁘게 보이는 것도 중요하지만, 방문자가 내용을 이해하고 다음 행동을 할 수 있어야 합니다.
            문구, 버튼, 이미지, 모바일 화면을 실제 사용자 입장에서 점검합니다.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {TRUST_CARDS.map((t) => (
              <div key={t.title} className="lux-card card-hover flex flex-col gap-3 rounded-2xl p-8">
                <p className="text-[18px] font-bold text-accent">{t.title}</p>
                <p className="text-[15px] leading-[1.7] text-muted">{t.desc}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-[560px] text-center text-[16px] leading-[1.7] text-soft">
            단순히 예쁘게 바꾸는 것보다,
            <br />
            <strong className="font-bold text-ink">방문자가 읽고 이해하고 문의할 수 있는 흐름</strong>을 먼저 봅니다.
          </p>
        </div>
      </section>

      {/* 9. 작업 과정 */}
      <section id="process" className="scroll-mt-20 border-t border-line bg-navy2 px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>작업 과정</SectionLabel>
          <h2 className="mx-auto mb-14 text-center text-[32px] font-extrabold leading-tight tracking-tight md:text-[40px]">
            복잡한 절차 없이,
            <br />
            화면 캡처 한 장부터 시작합니다
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

      {/* 8. 가격 안내 */}
      <section id="pricing" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <SectionLabel center>가격 안내</SectionLabel>
          <h2 className="mx-auto mb-3.5 text-center text-[32px] font-extrabold tracking-tight md:text-[40px]">
            세 가지 구성 중에 고르세요
          </h2>
          <p className="mx-auto mb-14 max-w-[520px] text-center text-[16px] text-muted">
            정확한 금액은 수정 범위와 페이지 상태를 확인한 뒤 안내드립니다.
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
            불필요하게 큰 작업으로 안내하지 않고,{" "}
            <strong className="font-bold text-soft">필요한 범위부터 현실적으로 제안</strong>드립니다.
          </p>

          <div className="lux-card mt-6 flex flex-col items-start gap-3 rounded-xl !border-[rgba(47,214,255,0.3)] px-7 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <p className="text-[15px] text-soft">
              <strong className="text-cyan">유지보수 월 구독</strong> — 자주 고칠 일이 있다면, 매달 정해진 비용으로
              필요한 수정을 맡기세요.
            </p>
            <a href={KMONG_URL} className="shrink-0 text-sm font-bold text-cyan transition hover:brightness-125">
              구독 문의 →
            </a>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-line bg-navy2 px-6 py-24 md:px-10 md:py-28">
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

      {/* 12. 마지막 CTA */}
      <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line px-6 py-28 md:px-10 md:py-32">
        <div
          className="pointer-events-none absolute -bottom-56 left-1/2 h-[420px] w-[800px] -translate-x-1/2"
          style={{ background: "radial-gradient(ellipse at center, rgba(76,141,255,0.16), transparent 70%)" }}
        />
        <div className="relative mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
          <h2 className="text-[34px] font-extrabold leading-tight tracking-tighter md:text-[50px]">
            홈페이지를 새로 만들기 전에,
            <br />
            먼저 고칠 수 있는 부분부터 확인해보세요
          </h2>
          <p className="max-w-[560px] text-[16px] leading-[1.65] text-muted md:text-lg">
            텍스트, 이미지, 버튼, 모바일 화면까지 필요한 곳만 빠르게 정리해드립니다.
            <br className="hidden md:block" /> 화면 캡처 한 장이면 상담을 시작할 수 있습니다.
          </p>
          <a
            href={KMONG_URL}
            className="btn-primary mt-1 rounded-xl px-10 py-4 text-lg font-extrabold text-navy"
          >
            크몽 문의하기
          </a>
          <p className="max-w-[480px] text-sm leading-relaxed text-dim">
            지금 당장 전체 리뉴얼이 필요한지,
            <br />
            간단한 수정만으로 충분한지 먼저 확인해드립니다.
          </p>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="flex flex-col gap-2 border-t border-line px-6 py-7 text-[13px] text-dim sm:flex-row sm:justify-between md:px-10">
        <span>© 2026 홈페이지 수정 클리닉 · <a href="/" className="transition hover:text-soft">ICEBERG</a></span>
        <span>홈페이지 수정 · 웹페이지 개선 · 랜딩페이지 정리</span>
      </footer>
    </main>
  );
}
