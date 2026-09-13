"use client";

import { QuickStart, AboutSection, ProcessSection } from "./components/BusinessSections";
import { useEffect, useRef, useState } from "react";
import { WORKS, WORK_CATEGORIES, type WorkCategory } from "./data/works";

/** 스크롤 리빌 — .reveal 요소가 보이면 is-visible 부여 (1회).
 *  안전장치: 어떤 이유로든(관찰 누락·HMR 등) 2.5초 내 등장 못 한 요소는 강제 표시 —
 *  효과는 잃어도 내용이 빈 화면으로 남는 일은 절대 없게. */
function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    const fallback = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => el.classList.add("is-visible"));
    }, 2500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);
}

/** 스크롤 다이브 — 히어로 구간을 스크롤한 비율(0→1)을 --p 커스텀 속성으로 노출.
 *  수면 위 빙산의 일각에서 → 수면 아래 시스템들로 "잠수"하는 패럴랙스에 쓰인다.
 *  --p 는 상속되므로 섹션 하위 요소가 CSS calc 로 직접 참조한다. */
function useDiveProgress(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 모션 최소화 선호 시엔 스크롤 연동을 끄고 CSS 미디어쿼리로 정적 표시
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 1));
      const prog = total > 0 ? scrolled / total : 0;
      el.style.setProperty("--p", prog.toFixed(4));
      // 충분히 잠수했을 때만 하단 카드/버튼 클릭 활성화 (겹침 오클릭 방지)
      el.classList.toggle("is-deep", prog > 0.72);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/** 페이지 수심 게이지 — 문서 전체 스크롤 진행(0→1)을 --sp 로 노출, 맨 아래가 DEEP */
function PageDepthGauge() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty("--sp", total > 0 ? Math.min(window.scrollY / total, 1).toFixed(4) : "0");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className="page-depth pointer-events-none hidden xl:block" aria-hidden="true">
      <span className="dive-depth-top">SEA&nbsp;LV</span>
      <span className="page-depth-marker" />
      <span className="dive-depth-bottom">DEEP</span>
    </div>
  );
}

/** 숫자 카운트업 — "12,000+" 같은 문자열에서 숫자만 뽑아 올라가게 */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const m = value.match(/[\d,]+/);
    if (!m) return;
    const target = parseInt(m[0].replace(/,/g, ""), 10);
    if (!Number.isFinite(target) || target <= 0) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          const cur = Math.round(target * eased).toLocaleString();
          setDisplay(value.replace(m[0], cur));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{display}</span>;
}

// ─────────────────────────────────────────────
// 작업실(허브) 홈 — 모든 작업사례가 여기에 쌓이고,
// 각 크몽 상품 랜딩(/clinic 등)은 여기서 갈라져 나갑니다.
const BRAND = "ICEBERG";
const TAGLINE = "Idea · Code · Execute";
const KMONG_PROFILE_URL = "https://kmong.com/@김주루";
// ─────────────────────────────────────────────

/** 판매 중/준비 중 서비스(전단지) 목록 — 크몽 상품이 늘면 여기에 추가 */
const SERVICES = [
  { title: "학원·맞춤 관리 프로그램", desc: "학생·출결·성적 관리 경험을 바탕으로, 우리 업무에 맞는 관리 도구를 만듭니다.", href: "/programs", status: "맞춤 상담", live: true, icon: "/icons/automation.png" },
  {
    title: "홈페이지 수정 클리닉",
    desc: "문구·이미지·버튼·모바일 깨짐, 필요한 곳만 빠르게 고칩니다.",
    href: "/clinic",
    status: "크몽 등록 상품",
    live: true,
    icon: "/icons/clinic.png",
  },
  {
    title: "맞춤형 AI 챗봇 구축",
    desc: "회사 자료로 답하는 AI 챗봇 — 출처 인용, 모르면 답하지 않는 안전장치까지.",
    href: "/chatbot",
    status: "맞춤 상담",
    live: true,
    icon: "/icons/chatbot.png",
  },
  {
    title: "업무 자동화 프로그램",
    desc: "엑셀 정리, 문서 대량 생성, 반복 업무 — 매일 하는 일을 클릭 한 번으로.",
    href: "/automation",
    status: "맞춤 상담",
    live: true,
    icon: "/icons/automation.png",
  },
];

const STATS = [
  { value: "5+", label: "실운영 시스템" },
  { value: "12,000+", label: "문제은행 데이터" },
  { value: "195명", label: "OMR 자동 채점" },
  { value: "24시간", label: "AI 챗봇 응답" },
];

const CATEGORY_COLOR: Record<WorkCategory, string> = {
  "AI": "border-[rgba(47,214,255,0.4)] text-cyan",
  "자동화": "border-[rgba(76,141,255,0.4)] text-accent",
  "웹·앱": "border-[rgba(148,178,255,0.35)] text-soft",
  "수정": "border-[rgba(148,178,255,0.25)] text-muted",
};

export default function HubPage() {
  const [filter, setFilter] = useState<(typeof WORK_CATEGORIES)[number]>("전체");
  const [menuOpen, setMenuOpen] = useState(false);
  const diveRef = useRef<HTMLElement>(null);
  useScrollReveal();
  useDiveProgress(diveRef);

  const visible = filter === "전체" ? WORKS : WORKS.filter((w) => w.category === filter);

  return (
    <main className="min-h-screen bg-navy text-ink">
      {/* 페이지 전체 수심 게이지 — 맨 아래까지 스크롤하면 DEEP 도달 */}
      <PageDepthGauge />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-line bg-navy/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5 md:px-10">
          <a href="/" className="flex items-center gap-2.5">
            {/* 빙산 로고 — 배경이 네이비라 사이트 배경과 이어져 보인다 */}
            <img src="/logo.png?v=2" alt="" className="h-[30px] w-[30px]" aria-hidden="true" />
            <span className="flex flex-col leading-none">
              <span className="text-[17px] font-extrabold tracking-tight">{BRAND}</span>
              <span className="mt-0.5 text-[9px] font-semibold tracking-[0.14em] text-dim">{TAGLINE}</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
            <a href="#start" className="transition hover:text-ink">작은 수정</a>
            <a href="#about" className="transition hover:text-ink">개발자 소개</a>
            <a href="#services" className="transition hover:text-ink">서비스</a>
            <a href="#works" className="transition hover:text-ink">작업사례</a>
            <a href="#contact" className="transition hover:text-ink">문의</a>
            <a
              href={KMONG_PROFILE_URL}
              className="btn-primary rounded-lg px-4 py-2 font-bold text-navy"
            >
              크몽에서 만나기
            </a>
          </nav>
          <div className="flex items-center gap-3 lg:hidden">
            <a href={KMONG_PROFILE_URL} className="btn-primary rounded-lg px-3.5 py-2 text-sm font-bold text-navy">
              크몽에서 만나기
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
            {[
              { label: "작은 수정", href: "#start" },
              { label: "개발자 소개", href: "#about" },
              { label: "서비스", href: "#services" },
              { label: "작업사례", href: "#works" },
              { label: "문의", href: "#contact" },
            ].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block py-2.5 text-[15px] text-soft">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero — 스크롤로 수면 아래 빙산으로 잠수하는 다이브 */}
      <section ref={diveRef} className="dive relative">
        <div className="dive-stage sticky top-0 flex h-screen items-center justify-center overflow-hidden text-center">
          {/* 수면(위) → 심해(아래) 배경 */}
          <div className="dive-water pointer-events-none absolute inset-0" />
          {/* 빙산 씬(Higgsfield 생성) — 스크롤하면 씬이 위로 흘러 심해로 잠수 */}
          <div className="dive-scene pointer-events-none">
            <img src="/hero-berg.jpg" alt="" aria-hidden="true" />
          </div>
          <div className="bg-dots pointer-events-none absolute inset-0" />
          {/* 수면에서 내리꽂히는 광선 */}
          <div className="dive-rays pointer-events-none" />
          {/* 내려갈수록 짙어지는 심해 */}
          <div className="dive-abyss pointer-events-none absolute inset-0" />
          {/* 잠수 깊이에 따라 씬 전체를 눌러주는 딤 */}
          <div className="dive-dim pointer-events-none absolute inset-0" />
          {/* 상단 글로우 */}
          <div className="dive-glow pointer-events-none absolute left-1/2 top-[-12%] h-[520px] w-[860px]" />

          {/* 헤드라인 가독 스크림 + 필름 그레인 */}
          <div className="dive-scrim pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="grain pointer-events-none absolute inset-0" />

          {/* 상승 기포 */}
          <div className="dive-bubbles pointer-events-none absolute inset-0">
            {Array.from({ length: 16 }).map((_, i) => {
              const size = 4 + (i % 4) * 3;
              return (
                <span
                  key={i}
                  style={{
                    left: `${(i * 6.15 + 3) % 100}%`,
                    width: size,
                    height: size,
                    animationDuration: `${7 + (i % 5) * 1.3}s`,
                    animationDelay: `${-i * 0.8}s`,
                  }}
                />
              );
            })}
          </div>

          {/* 콘텐츠 — 진입 카피(위)와 수면 아래 카피(아래)가 스크롤로 교차 */}
          <div className="relative z-10 mx-auto w-full max-w-[1140px] px-6 md:px-10">
            {/* 진입 — 데스크톱: 왼쪽 정렬(빙산은 오른쪽), 모바일: 중앙 */}
            <div className="dive-intro flex flex-col items-center gap-7 text-center md:max-w-[600px] md:items-start md:text-left">
              <div className="rounded-full border border-[rgba(47,214,255,0.3)] bg-[rgba(8,18,38,0.65)] px-4 py-1.5 text-[13px] font-semibold text-cyan backdrop-blur-md md:text-sm">
                ICEBERG · 직접 만들어 운영하는 개발자
              </div>
              <h1 className="text-[36px] font-extrabold leading-[1.18] tracking-tighter md:text-[56px] [text-shadow:0_2px_28px_rgba(3,8,20,0.65)]">
                홈페이지 제작·수정부터
                <br />
                <span className="text-ice">맞춤 프로그램까지.</span>
              </h1>
              <p className="max-w-[560px] text-[16px] leading-relaxed text-soft md:text-lg">
                문구·이미지 교체, 화면 오류 해결부터 시작하세요.
                <br className="hidden md:block" />
                <span className="text-muted">학원 관리와 업무 자동화 경험을 바탕으로 필요한 곳을 고칩니다.</span>
              </p>
              <div className="dive-cue mt-2 flex flex-col items-center gap-2 text-cyan">
                <span className="text-[11px] font-bold tracking-[0.24em]">SCROLL</span>
                <span className="dive-cue-arrow" />
              </div>
            </div>

            {/* 잠수 후 — 수면 아래 실제 시스템들 (인트로와 같은 왼쪽 라인) */}
            <div className="dive-deep text-center md:text-left">
              <p className="eyebrow mb-4 text-[12px] font-bold text-cyan md:justify-start">BELOW THE SURFACE</p>
              <h2 className="mx-auto mb-4 max-w-[720px] text-[30px] font-extrabold leading-[1.16] tracking-tight md:mx-0 md:text-[52px] [text-shadow:0_2px_28px_rgba(3,8,20,0.65)]">
                수면 아래엔, 매일 실제로
                <br className="hidden sm:block" /> 돌아가는 <span className="text-ice">시스템들</span>이 있습니다.
              </h2>
              <p className="mx-auto mb-9 max-w-[560px] text-[15px] leading-relaxed text-muted md:mx-0 md:text-lg">
                문제은행 12,000+ · AI 튜터 · 자동 채점 · 출결.
                <br className="hidden md:block" />
                전부 지금 실제 운영 중 — 아래 작업사례에서 직접 확인하실 수 있습니다.
              </p>
              <div className="dive-deep-body mx-auto grid max-w-[720px] grid-cols-2 gap-3 md:mx-0 md:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label} className="lux-card rounded-2xl px-4 py-5">
                    <p className="text-[24px] font-extrabold tracking-tight text-accent md:text-[28px]">
                      <CountUp value={s.value} />
                    </p>
                    <p className="mt-1 text-[12px] font-semibold text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="dive-deep-body mt-8 flex flex-col justify-center gap-3.5 sm:flex-row md:justify-start">
                <a
                  href="#works"
                  className="btn-primary rounded-xl px-8 py-4 text-[17px] font-extrabold text-navy"
                >
                  실제 작업사례 보기
                </a>
                <a
                  href={KMONG_PROFILE_URL}
                  className="btn-ghost rounded-xl px-8 py-4 text-[17px] font-semibold text-ink"
                >
                  크몽에서 문의하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuickStart />
      <AboutSection />
      {/* 서비스 (전단지들) */}
      <section
        id="services"
        className="scroll-mt-20 px-6 py-24 md:px-10 md:py-28"
        style={{ background: "linear-gradient(180deg, #030812 0%, #0D1422 420px)" }}
      >
        <div className="mx-auto max-w-[980px]">
          <p className="eyebrow mb-4 text-[12px] font-bold text-cyan">SERVICES</p>
          <h2 className="mx-auto mb-5 text-center text-[30px] font-extrabold tracking-tight md:text-[40px]">
            이런 일을 맡기실 수 있습니다
          </h2>
          <p className="mx-auto mb-14 max-w-[560px] text-center text-[16px] leading-[1.7] text-muted">
            작은 수정부터 시작해서, 자동화·AI까지 필요한 만큼만.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <a
                key={s.title}
                href={s.href}
                style={{ transitionDelay: `${i * 90}ms` }}
                className={`reveal card-hover lux-card group flex flex-col gap-3 rounded-2xl p-8 ${
                  s.live ? "!border-[rgba(47,214,255,0.35)]" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  {/* 크리스탈 아이콘(Higgsfield, 배경 제거·여백 크롭) */}
                  <img
                    src={s.icon + "?v=2"}
                    alt=""
                    aria-hidden="true"
                    className="h-14 w-14 drop-shadow-[0_0_18px_rgba(76,141,255,0.35)] transition-transform duration-300 group-hover:scale-110"
                  />
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                      s.live ? "bg-cyan text-navy" : "border border-line text-dim"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className={`text-[19px] font-extrabold ${s.live ? "text-cyan" : ""}`}>{s.title}</p>
                <p className="text-[15px] leading-relaxed text-muted">{s.desc}</p>
                <span className={`mt-auto pt-2 text-sm font-bold ${s.live ? "text-cyan" : "text-dim"}`}>
                  {s.live ? "자세히 보기 →" : "곧 열립니다"}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 작업사례 갤러리 */}
      <section id="works" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <p className="eyebrow mb-4 text-[12px] font-bold text-cyan">WORKS</p>
          <h2 className="mx-auto mb-5 text-center text-[30px] font-extrabold tracking-tight md:text-[40px]">
            작업사례
          </h2>
          <p className="mx-auto mb-10 max-w-[560px] text-center text-[16px] leading-[1.7] text-muted">
            자체 개발·운영 경험과 제공 서비스를 정리했습니다. 각 사례에서 문제와 구현 방법을 확인하세요.
          </p>

          {/* 카테고리 필터 */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {WORK_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  filter === c
                    ? "bg-accent text-navy"
                    : "border border-line text-muted hover:border-accent hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {visible.map((w) => (
              <div key={w.slug} className="card-hover lux-card flex flex-col gap-4 rounded-2xl p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[19px] font-extrabold leading-snug">{w.title}</p>
                  <div className="flex shrink-0 items-center gap-2">
                    {w.live && (
                      <span className="flex items-center gap-1.5 rounded-full bg-[rgba(47,214,255,0.1)] px-2.5 py-1 text-[11px] font-extrabold text-cyan">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
                        운영 중
                      </span>
                    )}
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${CATEGORY_COLOR[w.category]}`}>
                      {w.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 text-[14.5px] leading-relaxed">
                  <p className="text-muted">
                    <strong className="mr-1.5 font-extrabold text-dim">문제</strong> {w.problem}
                  </p>
                  <p className="text-soft">
                    <strong className="mr-1.5 font-extrabold text-accent">해결</strong> {w.solution}
                  </p>
                  <p className="rounded-lg border border-[rgba(47,214,255,0.25)] bg-[rgba(47,214,255,0.05)] px-3.5 py-2.5 font-semibold text-[#A9E8F8]">
                    결과 — {w.result}
                  </p>
                </div>
                <a href={`/works/${w.slug}`} className="font-bold text-cyan">사례 자세히 보기 →</a>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                  {w.tags.map((t) => (
                    <span key={t} className="rounded-md bg-well px-2 py-1 text-[12px] font-semibold text-cyan">
                      #{t}
                    </span>
                  ))}
                  {w.serviceHref && (
                    <a href={w.serviceHref} className="ml-auto text-[13px] font-bold text-cyan transition hover:brightness-125">
                      이 서비스 보기 →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-[13px] text-dim">
            새 작업이 끝날 때마다 이 목록에 계속 추가됩니다.
          </p>
        </div>
      </section>

      <ProcessSection />
      {/* CTA */}
      <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-navy2 px-6 py-28 md:px-10">
        <div
          className="pointer-events-none absolute -bottom-56 left-1/2 h-[420px] w-[800px] -translate-x-1/2"
          style={{ background: "radial-gradient(ellipse at center, rgba(76,141,255,0.16), transparent 70%)" }}
        />
        <div className="relative mx-auto flex max-w-[860px] flex-col items-center gap-6 text-center">
          <h2 className="text-[32px] font-extrabold leading-tight tracking-tighter md:text-[46px]">
            뭐부터 해야 할지 몰라도 괜찮습니다.
            <br />
            지금 상황부터 이야기해주세요.
          </h2>
          <p className="max-w-[560px] text-[16px] leading-[1.65] text-muted md:text-lg">
            수정 한 건이든, 자동화든, 챗봇이든 — 필요한 범위부터 현실적으로 제안드립니다.
          </p>
          <a
            href={KMONG_PROFILE_URL}
            className="btn-primary mt-1 rounded-xl px-10 py-4 text-lg font-extrabold text-navy"
          >
            크몽에서 문의하기
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 border-t border-line px-6 py-7 text-[13px] text-dim sm:flex-row sm:justify-between md:px-10">
        <span>© 2026 {BRAND}</span>
        <div className="flex gap-4">
          <a href="/clinic" className="transition hover:text-soft">홈페이지 수정 클리닉</a>
          <span>웹 · 자동화 · AI</span>
        </div>
      </footer>
    </main>
  );
}
