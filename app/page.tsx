"use client";

import TimeValue from "./components/TimeValue";
import ProofSection from "./components/ProofSection";
import StudentCardDemo from "./components/StudentCardDemo";
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
    desc: "홈페이지 문구·이미지 수정부터 네이버 블로그·카페 꾸미기까지 상담합니다.",
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
    title: "한글 HWPX·업무 자동화",
    desc: "한글 문서 생성, 엑셀·파일 정리. 반복 업무에 쓰는 시간을 줄여드립니다.",
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

      <section className="relative overflow-hidden border-b border-line px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-[1080px] gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="text-sm font-bold tracking-widest text-cyan">ICEBERG · 작은 수정도 맡겨주세요</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">문구 한 줄, 사진 한 장.<br/><span className="text-cyan">필요한 곳만 고칩니다.</span></h1>
            <p className="mt-6 text-lg leading-8 text-soft">홈페이지에서 바꾸고 싶은 화면을 보내주세요.<br/>가능한 작업과 비용부터 안내합니다.</p>
            <div className="mt-7 flex flex-wrap gap-3"><a href="https://kmong.com/gig/789321" className="btn-primary rounded-xl px-6 py-4 font-bold text-navy">크몽에서 작은 수정 문의 →</a><a href="#start" className="btn-ghost rounded-xl px-6 py-4 font-bold">5천원 작업 범위 보기</a></div>
            <p className="mt-4 text-sm leading-6 text-muted">문구 1곳 또는 준비된 이미지 1장 교체 · 5,000원<br/>1페이지 · 수정 1회 · 작업 1일 / 결제 전 가능 여부 확인</p>
          </div>
          <aside className="rounded-3xl border border-line bg-navy2 p-7 md:p-9">
            <p className="text-sm font-bold text-cyan">처음 문의할 때는 이것만</p>
            <ol className="mt-6 space-y-5 text-lg"><li>① 수정할 홈페이지 주소</li><li>② 바꾸고 싶은 화면 캡처</li><li>③ 새 문구 또는 교체할 사진</li></ol>
            <p className="mt-6 border-t border-line pt-5 text-sm leading-7 text-muted">“여기를 이렇게 바꾸고 싶어요”라고 알려주세요. 작업 범위와 비용을 확인한 뒤 진행합니다. 오류 수정·새 이미지 제작은 별도 견적입니다.</p>
            <a href="#proof" className="mt-5 inline-block font-bold text-cyan">실제 화면 개선 전·후 보기 →</a>
          </aside>
        </div>
      </section>

      <QuickStart />
      <ProofSection />
      <StudentCardDemo />
      <AboutSection />
      <TimeValue />
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
