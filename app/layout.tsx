import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "홈페이지 수정 클리닉 — 필요한 곳만 고쳐드립니다",
  description:
    "홈페이지, 새로 만들지 마세요. 텍스트 수정, 이미지 교체, 버튼 링크 변경, 모바일 깨짐까지 빠르게 정리해드립니다. 화면 캡처 한 장이면 상담을 시작할 수 있습니다.",
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
