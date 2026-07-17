import type { Metadata } from "next";

// /chatbot 전용 메타데이터 — 페이지 컴포넌트가 "use client" 라 여기서 선언
export const metadata: Metadata = {
  title: "맞춤형 AI 챗봇 구축 — 회사 자료로 답하는 챗봇",
  description:
    "우리 회사 자료·문서로 학습해 출처와 함께 답하는 AI 챗봇을 만들어드립니다. 모르면 답하지 않는 안전장치, 관리자 검수 화면까지 — 실서비스 운영 경험 그대로.",
};

export default function ChatbotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
