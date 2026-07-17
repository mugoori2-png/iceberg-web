import type { Metadata } from "next";

// /automation 전용 메타데이터 — 페이지 컴포넌트가 "use client" 라 여기서 선언
export const metadata: Metadata = {
  title: "업무 자동화 프로그램 — 매일 하는 일을 클릭 한 번으로",
  description:
    "엑셀 정리, 한글(HWP)·워드 문서 대량 생성, 반복 업무 자동화 프로그램을 만들어드립니다. 반나절 걸리던 일을 분 단위로 — 실무에서 직접 운영 중인 자동화 경험 그대로.",
};

export default function AutomationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
