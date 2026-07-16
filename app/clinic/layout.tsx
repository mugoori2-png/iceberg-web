import type { Metadata } from "next";

// /clinic 전용 메타데이터 — 페이지 컴포넌트가 "use client" 라 여기서 선언
export const metadata: Metadata = {
  title: "홈페이지 수정 클리닉 — 필요한 곳만 고쳐드립니다",
  description:
    "홈페이지, 새로 만들지 마세요. 텍스트 수정, 이미지 교체, 버튼 링크 변경, 모바일 깨짐까지 빠르게 정리해드립니다. 화면 캡처 한 장이면 상담을 시작할 수 있습니다.",
};

export default function ClinicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
