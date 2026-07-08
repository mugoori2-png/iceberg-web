# homepage-clinic-landing

"홈페이지 수정 클리닉" 판매형 랜딩페이지 — Next.js (App Router) + TypeScript + Tailwind CSS.

## 실행 방법

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 프로덕션 빌드
```

## Vercel 배포

1. 이 폴더를 GitHub 저장소에 push
2. vercel.com → Add New Project → 저장소 선택 → Deploy (설정 변경 불필요)

## 크몽 링크 교체

`app/page.tsx` 상단의 상수 하나만 바꾸면 모든 CTA 버튼에 적용됩니다.

```ts
const KMONG_URL = "#"; // → 크몽 상품 URL로 교체
```

## 구조

- `app/layout.tsx` — 메타데이터, Pretendard 폰트
- `app/page.tsx` — 전체 랜딩페이지 (11개 섹션, FAQ 아코디언 포함)
- `app/globals.css` — Tailwind + 전역 스타일
- `tailwind.config.ts` — 브랜드 색상 토큰 (navy / accent / cyan 등)
