"use client";

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
  {
    title: "홈페이지 수정 클리닉",
    desc: "문구·이미지·버튼·모바일 깨짐, 필요한 곳만 빠르게 고칩니다.",
    href: "/clinic",
    status: "판매 중",
    live: true,
  },
  {
    title: "맞춤형 AI 챗봇 구축",
    desc: "회사 자료로 답하는 AI 챗봇 — 출처 인용, 모르면 답하지 않는 안전장치까지.",
    href: KMONG_PROFILE_URL,
    status: "준비 중",
    live: false,
  },
  {
    title: "업무 자동화 프로그램",
    desc: "엑셀 정리, 문서 대량 생성, 반복 업무 — 매일 하는 일을 클릭 한 번으로.",
    href: KMONG_PROFILE_URL,
    status: "준비 중",
    live: false,
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
  useScrollReveal();

  const visible = filter === "전체" ? WORKS : WORKS.filter((w) => w.category === filter);

  return (
    <main className="min-h-screen bg-navy text-ink">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-line bg-navy/90 backdrop-blur">
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
            <a href="#services" className="transition hover:text-ink">서비스</a>
            <a href="#works" className="transition hover:text-ink">작업사례</a>
            <a href="#contact" className="transition hover:text-ink">문의</a>
            <a
              href={KMONG_PROFILE_URL}
              className="rounded-lg bg-accent px-4 py-2 font-bold text-navy transition hover:brightness-110"
            >
              크몽에서 만나기
            </a>
          </nav>
          <div className="flex items-center gap-3 lg:hidden">
            <a href={KMONG_PROFILE_URL} className="rounded-lg bg-accent px-3.5 py-2 text-sm font-bold text-navy">
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

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 text-center md:px-10 md:pt-28">
        <div className="bg-dots pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute -top-52 left-1/2 h-[480px] w-[820px] -translate-x-1/2 animate-glow"
          style={{ background: "radial-gradient(ellipse at center, rgba(76,141,255,0.18), rgba(47,214,255,0.06) 55%, transparent 75%)" }}
        />
        {/* 대형 빙산 — 헤드라인 뒤에서 은은하게 부유 */}
        <img
          src="/logo.png?v=2"
          alt=""
          aria-hidden="true"
          className="hero-iceberg pointer-events-none absolute left-1/2 top-6 h-[340px] w-[340px] opacity-[0.14] blur-[1.5px] md:top-2 md:h-[440px] md:w-[440px]"
        />
        <div className="relative mx-auto flex max-w-[860px] flex-col items-center gap-7">
          <div className="rounded-full border border-[rgba(47,214,255,0.25)] bg-[rgba(47,214,255,0.07)] px-4 py-1.5 text-[13px] font-semibold text-cyan md:text-sm">
            홈페이지 수정 · 업무 자동화 · AI 챗봇 구축
          </div>
          <h1 className="text-[38px] font-extrabold leading-[1.16] tracking-tighter md:text-[60px]">
            직접 만들어 운영하는 개발자가
            <br />
            <span className="text-accent">필요한 것만 만들어드립니다.</span>
          </h1>
          <p className="max-w-[640px] text-[16px] leading-relaxed text-muted md:text-lg">
            보이는 서비스는 빙산의 일각 — 수면 아래엔 매일 실제로 돌아가는 시스템들이 있습니다.
            <br className="hidden md:block" />
            문제은행 12,000+ · AI 튜터 · 자동 채점 · 출결. 전부 아래 작업사례에서 확인하실 수 있습니다.
          </p>
          <div className="mt-1 flex flex-col gap-3.5 sm:flex-row">
            <a
              href="#works"
              className="rounded-xl bg-accent px-8 py-4 text-[17px] font-extrabold text-navy shadow-[0_8px_32px_rgba(76,141,255,0.3)] transition hover:brightness-110"
            >
              실제 작업사례 보기
            </a>
            <a
              href={KMONG_PROFILE_URL}
              className="rounded-xl border border-[rgba(148,178,255,0.25)] px-8 py-4 text-[17px] font-semibold text-ink transition hover:border-accent"
            >
              크몽에서 문의하기
            </a>
          </div>
        </div>

        {/* 숫자 증거 — 스크롤 진입 시 카운트업 */}
        <div className="relative mx-auto mt-16 grid max-w-[860px] grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="reveal card-hover rounded-2xl border border-line bg-card px-4 py-6"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <p className="text-[26px] font-extrabold tracking-tight text-accent md:text-[30px]">
                <CountUp value={s.value} />
              </p>
              <p className="mt-1 text-[13px] font-semibold text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 서비스 (전단지들) */}
      <section id="services" className="scroll-mt-20 border-t border-line bg-navy2 px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[980px]">
          <p className="mb-3 text-center text-sm font-bold tracking-wider text-cyan">SERVICES</p>
          <h2 className="mx-auto mb-5 text-center text-[30px] font-extrabold tracking-tight md:text-[40px]">
            이런 일을 맡기실 수 있습니다
          </h2>
          <p className="mx-auto mb-14 max-w-[560px] text-center text-[16px] leading-[1.7] text-muted">
            작은 수정부터 시작해서, 자동화·AI까지 필요한 만큼만.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <a
                key={s.title}
                href={s.href}
                style={{ transitionDelay: `${i * 90}ms` }}
                className={`reveal card-hover group flex flex-col gap-3 rounded-2xl p-8 ${
                  s.live
                    ? "border border-[rgba(47,214,255,0.4)] bg-card2"
                    : "border border-line bg-card"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className={`text-[19px] font-extrabold ${s.live ? "text-cyan" : ""}`}>{s.title}</p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                      s.live ? "bg-cyan text-navy" : "border border-line text-dim"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
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
          <p className="mb-3 text-center text-sm font-bold tracking-wider text-cyan">WORKS</p>
          <h2 className="mx-auto mb-5 text-center text-[30px] font-extrabold tracking-tight md:text-[40px]">
            작업사례
          </h2>
          <p className="mx-auto mb-10 max-w-[560px] text-center text-[16px] leading-[1.7] text-muted">
            데모가 아니라 실제로 운영 중인 것들입니다. 문제 → 해결 → 결과 순서로 정리했습니다.
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
              <div key={w.slug} className="card-hover flex flex-col gap-4 rounded-2xl border border-line bg-card p-8">
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
            className="mt-1 rounded-xl bg-accent px-10 py-4 text-lg font-extrabold text-navy shadow-[0_8px_32px_rgba(76,141,255,0.3)] transition hover:brightness-110"
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
