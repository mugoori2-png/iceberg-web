import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICEBERG — 보이는 서비스는 빙산의 일각입니다",
  description:
    "Idea · Code · Execute. 문제은행 12,000+, AI 튜터, 자동 채점, 출결 — 매일 실제로 돌아가는 시스템을 직접 만들어 운영합니다. 홈페이지 수정부터 업무 자동화, AI 챗봇 구축까지.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
