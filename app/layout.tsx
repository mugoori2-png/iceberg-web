import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cmong-lac.vercel.app"),
  title: "ICEBERG — 홈페이지 제작·수정 · 업무 자동화 · AI 챗봇 구축",
  description:
    "직접 만들어 운영하는 개발자가 필요한 것만 빠르게 만들어드립니다. 문제은행 12,000+, AI 튜터, 자동 채점, 출결 — 매일 실제로 돌아가는 시스템이 증거입니다.",
  openGraph: {
    title: "ICEBERG — 홈페이지 제작·수정 · 업무 자동화 · AI 챗봇 구축",
    description:
      "직접 만들어 운영하는 개발자가 필요한 것만 만들어드립니다. 홈페이지 수정 · 업무 자동화 · AI 챗봇 구축.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
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
