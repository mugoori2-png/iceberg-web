const KMONG = "https://kmong.com/gig/789321";

export function QuickStart() {
  return <section id="start" className="scroll-mt-24 border-y border-line bg-navy2 px-6 py-20 md:px-10">
    <div className="mx-auto max-w-[980px]">
      <p className="text-sm font-bold tracking-widest text-cyan">START SMALL · 작은 수정부터</p>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">이미지 하나, 문구 한 줄.<br />작은 일도 맡겨주세요.</h2>
      <p className="mt-5 max-w-2xl leading-7 text-muted">어디를 고쳐야 하는지 설명하기 어려워도 괜찮습니다. 홈페이지 주소와 고치고 싶은 화면을 보내주시면 가능한 작업과 범위부터 정리합니다.</p>
      <div className="my-8 grid gap-4 md:grid-cols-3">{[
        ["01", "문구·이미지 교체", "소개 문구, 연락처, 배너, 사진, 버튼 이름과 링크 수정"],
        ["02", "모바일 화면 수정", "휴대폰에서 잘리는 글자, 겹치는 버튼, 어긋난 여백과 배치"],
        ["03", "홈페이지 오류 점검", "작동하지 않는 버튼과 화면 오류를 확인하고 수정 범위 안내"],
      ].map(([n,t,d]) => <article key={n} className="lux-card rounded-2xl p-6"><span className="font-mono text-cyan">{n}</span><h3 className="my-3 text-xl font-bold">{t}</h3><p className="text-sm leading-6 text-muted">{d}</p></article>)}</div>
      <div className="flex flex-wrap items-center gap-5"><a href={KMONG} className="btn-primary rounded-xl px-6 py-4 font-bold text-navy">크몽 수정 상품 보기 →</a><p className="text-sm text-muted">등록 상품 5,000원부터 · 상세 범위와 최종 금액은 크몽에서 확인</p></div>
      <p className="mt-4 text-sm text-dim">오류 해결·레이아웃 변경은 원인과 작업량을 확인한 후 별도로 안내합니다.</p>
    </div>
  </section>;
}

export function AboutSection() {
  return <section id="about" className="scroll-mt-24 px-6 py-24 md:px-10"><div className="mx-auto grid max-w-[980px] gap-10 md:grid-cols-2">
    <div><p className="text-sm font-bold tracking-widest text-cyan">ABOUT ICEBERG</p><h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">직접 만들고 운영하며<br />쌓아온 경험을 담았습니다.</h2><p className="mt-6 leading-8 text-muted">ICEBERG는 크몽 전문가 김주루의 개발 브랜드입니다. React·Supabase 기반 학원 관리 시스템을 직접 개발하고 운영한 경험을 바탕으로 홈페이지 수정부터 맞춤 프로그램까지 필요한 기능을 함께 정리합니다.</p><a href="https://kmong.com/@김주루" className="mt-6 inline-block font-bold text-cyan">크몽 전문가 프로필 확인 →</a></div>
    <div className="lux-card rounded-2xl p-7"><h3 className="text-lg font-bold">직접 진행한 개발 분야</h3><ul className="mt-5 space-y-4 text-sm leading-6 text-soft"><li>웹 개발 — React, JavaScript, HTML/CSS, Supabase</li><li>학원 운영 — 학생·출결·성적 관리, 관리자 대시보드</li><li>학습 도구 — 문제은행, 모의고사, 교재 기반 AI 튜터</li><li>업무 자동화 — OMR 채점, 한글 시험지·정답지·해설지 생성</li></ul><p className="mt-6 border-t border-line pt-5 text-sm leading-6 text-muted">아래는 자체 개발·운영 경험을 정리한 포트폴리오입니다. 크몽 고객의 구매 후기는 크몽 프로필에서 확인하실 수 있습니다.</p></div>
  </div></section>;
}

export function ProcessSection() {
  return <section id="guide" className="px-6 py-24 md:px-10"><div className="mx-auto max-w-[980px]"><p className="text-sm font-bold tracking-widest text-cyan">HOW WE WORK</p><h2 className="mt-4 text-3xl font-extrabold">처음 맡기는 작업도, 순서대로.</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
    ["요청 확인", "홈페이지 주소와 수정 화면, 원하는 결과를 크몽으로 보내주세요."],
    ["범위·견적 안내", "가능 여부, 포함 기능, 비용과 일정을 먼저 정리합니다."],
    ["작업·결과 확인", "합의한 범위대로 작업하고 변경 내용을 함께 확인합니다."],
    ["전달·사용 안내", "결과물과 필요한 사용 방법을 전달합니다. 추가 작업은 별도로 협의합니다."],
  ].map(([t,d],i)=><article key={t} className="rounded-2xl border border-line p-5"><p className="text-sm text-cyan">0{i+1}</p><h3 className="my-3 font-bold">{t}</h3><p className="text-sm leading-6 text-muted">{d}</p></article>)}</div>
  <div className="mt-12 space-y-3">{[
    ["작은 수정 한 건만 맡겨도 되나요?", "네. 문구나 이미지 교체처럼 작은 요청부터 확인합니다. 사이트 주소와 수정할 위치를 알려주세요."],
    ["어떤 홈페이지든 수정할 수 있나요?", "제작 방식과 수정 권한에 따라 달라집니다. 사이트를 확인한 뒤 가능한 방법과 필요한 접근 범위를 안내합니다."],
    ["학원 외의 맞춤 프로그램도 가능한가요?", "네. 현재 사용 중인 엑셀이나 업무 순서를 바탕으로 필요한 화면과 기능을 정리합니다. 학원 관리·맞춤 프로그램은 개별 상담 후 범위를 정합니다."],
    ["후기와 개발 사례는 어디에서 확인하나요?", "이 홈페이지에서는 자체 개발 사례를, 크몽에서는 실제 구매 후기를 확인하실 수 있습니다."],
  ].map(([q,a])=><details key={q} className="rounded-xl border border-line p-5"><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-4 text-sm leading-7 text-muted">{a}</p></details>)}</div></div></section>;
}
