import type { Metadata } from "next";

// /automation 전용 메타데이터 — 페이지 컴포넌트가 "use client" 라 여기서 선언
export const metadata: Metadata = {
  title: "한글 HWPX·업무 자동화 — 중요한 일에 시간을 쓰세요 | ICEBERG",
  description:
    "한글 HWPX 문서 생성, 엑셀·파일 정리, 반복 입력에 쓰는 시간을 줄이는 맞춤 자동화 프로그램. 실제 업무와 양식을 확인해 제작 범위를 안내합니다.",
};

export default function AutomationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
