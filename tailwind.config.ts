import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B0F17",       // 기본 배경
        navy2: "#0D1422",      // 교차 섹션 배경
        card: "#101624",       // 카드 배경
        card2: "#101a2e",      // 강조 카드 배경
        panel: "#0D1220",      // Before 패널
        accent: "#4C8DFF",     // 블루 포인트
        cyan: "#2FD6FF",       // 시안 포인트
        ink: "#EDF1F8",        // 본문 텍스트
        soft: "#C6CFDE",       // 밝은 보조 텍스트
        muted: "#8E9AB0",      // 보조 텍스트
        dim: "#5E6B84",        // 흐린 텍스트
        line: "rgba(148,178,255,0.12)",
        bar: "#333D55",        // mockup 텍스트 바
        bar2: "#1E2638",       // mockup 흐린 바
        bar3: "#2A3348",       // mockup 회색 바
        well: "#151C2E"        // mockup 카드
      },
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        glow: "glowPulse 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
