import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cmong-lac.vercel.app"),
  title: "ICEBERG — 홈페이지 리모델링·맞춤 프로그램·AI 광고 영상",
  description:
    "홈페이지 제작·리모델링, 맞춤 프로그램과 SaaS, 한글·엑셀 업무 자동화, AI 광고 영상 제작을 상담합니다. 실제 개발 사례와 시연을 확인하세요.",
  openGraph: {
    title: "ICEBERG — 홈페이지 리모델링·맞춤 프로그램·AI 광고 영상",
    description:
      "홈페이지부터 프로그램, 자동화와 홍보 콘텐츠까지. 필요한 작업을 확인하고 크몽에서 상담하세요.",
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
