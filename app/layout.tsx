import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cmong-lac.vercel.app"),
  title: "ICEBERG — 홈페이지 문구·이미지 작은 수정 5,000원부터",
  description:
    "문구 1곳 또는 준비된 이미지 1장 교체 5,000원. 홈페이지 주소와 바꿀 화면을 보내주세요. 작업 가능 여부와 비용부터 안내합니다.",
  openGraph: {
    title: "ICEBERG — 홈페이지 문구·이미지 작은 수정 5,000원부터",
    description:
      "문구 한 줄, 사진 한 장부터. 작은 홈페이지 수정과 실제 개발 사례를 확인하고 크몽에서 문의하세요.",
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
